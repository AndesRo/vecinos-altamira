import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!url || !anonKey) {
  console.error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env')
}

export const supabase = createClient(url ?? 'http://localhost', anonKey ?? 'missing', {
  auth: { persistSession: true, autoRefreshToken: true },
})

export const SHARED_EMAIL = (import.meta.env.VITE_SHARED_EMAIL as string | undefined) ?? ''
export const BUCKET = 'altamira-files'

/** Abre un archivo privado con una URL firmada (válida 10 minutos). */
export async function openPrivateFile(path: string, download = false): Promise<string | null> {
  // Se abre la pestaña de inmediato para que el navegador no bloquee la ventana emergente.
  const win = download ? null : window.open('', '_blank')
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 600, download ? { download: true } : undefined)
  if (error || !data) {
    win?.close()
    return 'No se pudo abrir el documento. Inténtalo de nuevo en unos minutos.'
  }
  if (download) {
    window.location.href = data.signedUrl
  } else if (win) {
    win.location.href = data.signedUrl
  }
  return null
}
