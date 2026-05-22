import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Layout } from '@/components/Layout/Layout'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const GeneratePage = lazy(() => import('@/pages/GeneratePage'))
const CollectionsPage = lazy(() => import('@/pages/CollectionsPage'))
const StudyPage = lazy(() => import('@/pages/StudyPage'))
const QuizPage = lazy(() => import('@/pages/QuizPage'))
const StatsPage = lazy(() => import('@/pages/StatsPage'))

function AppRoutes() {
  const initAuth = useAuthStore((s) => s.initAuth)

  useEffect(() => {
    initAuth()
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/stats" element={<StatsPage />} />

      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'Arial Black',
          background: '#d4f5a0',
          fontSize: '1.2rem',
          fontWeight: 900,
          textTransform: 'uppercase',
        }}>
          Loading...
        </div>
      }>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App