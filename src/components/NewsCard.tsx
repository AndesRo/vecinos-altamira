import type { NewsItem } from '../types'

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })

export default function NewsCard({ item, full = false }: { item: NewsItem; full?: boolean }) {
  return (
    <article className="rounded-xl border border-marino/10 bg-white p-6 sm:p-8">
      <time dateTime={item.published_at} className="text-base font-semibold text-medio">
        {formatDate(item.published_at)}
      </time>
      <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">{item.title}</h3>
      <p className="mt-3 text-xl leading-relaxed text-tinta/85">{item.summary}</p>
      {full && item.body && <p className="mt-4 whitespace-pre-line text-xl leading-relaxed text-tinta/85">{item.body}</p>}
    </article>
  )
}
