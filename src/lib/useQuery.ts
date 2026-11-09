import { useEffect, useState } from 'react'

interface Result<T> {
  data: T | null
  error: { message: string } | null
}

export function useQuery<T>(run: () => PromiseLike<Result<T>>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.resolve(run()).then((res) => {
      if (!active) return
      if (res.error) setError('No pudimos cargar la información. Actualiza la página para intentarlo de nuevo.')
      else setData(res.data)
      setLoading(false)
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, error, loading }
}
