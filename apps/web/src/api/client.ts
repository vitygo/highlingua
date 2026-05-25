import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: () => void
  reject: (err: unknown) => void
}> = []

const processQueue = (error: unknown) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve()
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const url = originalRequest.url || ''

    const isAuthRoute = url.includes('/auth/login') || 
                        url.includes('/auth/register') || 
                        url.includes('/auth/refresh') ||
                        url.includes('/auth/me')

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => apiClient(originalRequest))
      }

      isRefreshing = true

      try {
        await apiClient.post('/auth/refresh')
        processQueue(null)
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)