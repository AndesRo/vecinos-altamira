import { useState } from 'react'
import { openPrivateFile } from '../lib/supabase'

export default function FileButtons({ path, label = 'Ver PDF' }: { path: string; label?: string }) {
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const run = async (download: boolean) => {
    setBusy(true)
    setError(null)
    setError(await openPrivateFile(path, download))
    setBusy(false)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-primario" disabled={busy} onClick={() => run(false)}>
          {label}
        </button>
        <button className="btn btn-secundario" disabled={busy} onClick={() => run(true)}>
          Descargar
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-base text-red-800">
          {error}
        </p>
      )}
    </div>
  )
}
