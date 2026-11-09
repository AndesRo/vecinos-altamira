export function Loading() {
  return <p className="py-10 text-xl text-medio">Cargando información…</p>
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <p role="alert" className="my-6 rounded-lg border-2 border-red-300 bg-red-50 p-5 text-lg text-red-900">
      {message}
    </p>
  )
}

export function Empty({ message }: { message: string }) {
  return <p className="rounded-lg border-2 border-dashed border-marino/25 bg-white p-8 text-xl text-tinta/70">{message}</p>
}
