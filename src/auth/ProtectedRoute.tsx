import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute() {
  const { session, loading } = useAuth()
  if (loading) return <p className="p-10 text-center text-xl text-medio">Cargando…</p>
  if (!session) return <Navigate to="/ingresar" replace />
  return <Outlet />
}
