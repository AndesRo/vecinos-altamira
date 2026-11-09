import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/eleccion', label: 'Elección' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/documentos', label: 'Documentos' },
  { to: '/contacto', label: 'Contacto' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-lg font-semibold ${
    isActive ? 'bg-marino text-white' : 'text-marino hover:bg-marino/10'
  }`

export default function Layout() {
  const { signOut } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-marino/10 bg-white/95 backdrop-blur">
        <div className="contenedor flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="h-9 w-1.5 rounded bg-dorado" aria-hidden />
            <span className="text-xl font-extrabold leading-tight text-marino">
              Vecinos Organizados
              <span className="block text-sm font-semibold text-medio">Edificio Altamira</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <button onClick={signOut} className="ml-2 rounded-md px-3 py-2 text-lg font-semibold text-medio hover:underline">
              Salir
            </button>
          </nav>

          <button
            className="rounded-md border-2 border-marino px-4 py-2 text-lg font-bold text-marino md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </div>

        {open && (
          <nav id="menu-movil" className="contenedor space-y-1 pb-4 md:hidden" aria-label="Principal móvil">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <button onClick={signOut} className="px-3 py-2 text-lg font-semibold text-medio underline">
              Salir
            </button>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-marino text-white">
        <div className="contenedor py-8">
          <p className="text-xl font-bold">Nuestra comunidad, nuestra voz.</p>
          <p className="mt-2 max-w-2xl text-base text-white/75">
            Sitio exclusivo para los vecinos del Edificio Altamira. Es solo informativo: no se vota ni se envían datos desde aquí.
          </p>
        </div>
      </footer>
    </div>
  )
}
