import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import App from './App'
import '@/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'Arial Black, Arial, sans-serif',
            border: '2.5px solid #1a1a1a',
            boxShadow: '4px 4px 0 #1a1a1a',
            borderRadius: '8px',
            fontWeight: '700',
                padding: '0.875rem 1rem'

          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
)