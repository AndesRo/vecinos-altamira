import type { ElectionInfo } from '../types'

export default function ElectionBox({ info, dark = false }: { info: ElectionInfo; dark?: boolean }) {
  const item = 'rounded-xl p-5 ' + (dark ? 'bg-white/10' : 'bg-papel')
  const label = 'text-base font-semibold ' + (dark ? 'text-dorado' : 'text-medio')
  const value = 'mt-1 text-2xl font-extrabold ' + (dark ? 'text-white' : 'text-marino')
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      <div className={item}>
        <dt className={label}>Fecha</dt>
        <dd className={value}>{info.date_text}</dd>
      </div>
      <div className={item}>
        <dt className={label}>Horario</dt>
        <dd className={value}>{info.time_text}</dd>
      </div>
      <div className={item}>
        <dt className={label}>Lugar</dt>
        <dd className={value}>{info.place}</dd>
      </div>
    </dl>
  )
}
