import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Eleccion from './pages/Eleccion'
import Noticias from './pages/Noticias'
import Documentos from './pages/Documentos'
import Contacto from './pages/Contacto'

export default function App() {
  return (
    <Routes>
      <Route path="/ingresar" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/eleccion" element={<Eleccion />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}
