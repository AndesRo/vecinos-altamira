import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const { session, loading, signIn } = useAuth()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!loading && session) return <Navigate to="/" replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setError(await signIn(password))
    setBusy(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-marino px-5 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 sm:p-10">
        <span className="block h-1.5 w-14 rounded bg-dorado" aria-hidden />
        <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">Vecinos Organizados Altamira</h1>
        <p className="mt-2 text-xl text-medio">Nuestra comunidad, nuestra voz.</p>
        <p className="mt-6 text-lg text-tinta/80">Ingresa la clave de la comunidad que compartió la administración.</p>

        <form onSubmit={onSubmit} className="mt-6">
          <label htmlFor="clave" className="block text-lg font-bold text-marino">
            Clave de la comunidad
          </label>
          <input
            id="clave"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border-2 border-marino/30 px-4 py-3.5 text-xl focus:border-marino"
          />
          <label className="mt-3 flex items-center gap-3 text-lg">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="h-5 w-5" />
            Mostrar clave
          </label>

          {error && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-lg text-red-900">
              {error}
            </p>
          )}

          <button type="submit" disabled={busy} className="btn btn-primario mt-6 w-full disabled:opacity-60">
            {busy ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
