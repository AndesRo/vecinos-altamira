import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useQuery } from '../lib/useQuery'
import type { Candidate, ElectionInfo, NewsItem } from '../types'
import ElectionBox from '../components/ElectionBox'
import NewsCard from '../components/NewsCard'
import { ErrorBox, Loading } from '../components/State'

export default function Home() {
  const election = useQuery<ElectionInfo>(() => supabase.from('election_info').select('*').eq('id', 1).maybeSingle())
  const candidates = useQuery<Candidate[]>(() => supabase.from('candidates').select('*').eq('published', true).order('sort_order'))
  const news = useQuery<NewsItem[]>(() =>
    supabase.from('news').select('*').eq('published', true).order('published_at', { ascending: false }).limit(3),
  )

  return (
    <>
      <section className="bg-marino text-white">
        <div className="contenedor py-14 sm:py-20">
          <p className="text-xl font-semibold text-dorado">Votación presencial</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            {election.data?.title ?? 'Elección de nueva administración'}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-white/85 sm:text-2xl">
            {election.data?.intro ?? 'Conoce a cada administración participante antes de votar.'}
          </p>

          <div className="mt-10">
            {election.loading ? <Loading /> : election.data && <ElectionBox info={election.data} dark />}
          </div>
          {election.error && <ErrorBox message={election.error} />}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/eleccion" className="btn btn-primario">
              Conocer a las administraciones
            </Link>
          </div>
          {election.data?.note && <p className="mt-6 max-w-3xl text-lg text-white/75">{election.data.note}</p>}
        </div>
      </section>

      {candidates.data && candidates.data.length > 0 && (
        <section className="contenedor py-12">
          <h2 className="text-3xl font-extrabold">Administraciones participantes</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {candidates.data.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/eleccion#${c.id}`}
                  className="block h-full rounded-xl border border-marino/10 bg-white p-6 hover:border-marino"
                >
                  <span className="text-2xl font-extrabold text-marino">{c.name}</span>
                  {c.tagline && <span className="mt-2 block text-lg text-tinta/75">{c.tagline}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="contenedor pb-14 pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-3xl font-extrabold">Últimas noticias</h2>
          <Link to="/noticias" className="text-xl font-bold text-medio underline">
            Ver todas las noticias
          </Link>
        </div>
        <div className="mt-6 space-y-5">
          {news.loading && <Loading />}
          {news.error && <ErrorBox message={news.error} />}
          {news.data?.map((n) => <NewsCard key={n.id} item={n} />)}
          {news.data?.length === 0 && <p className="text-xl text-tinta/70">Aún no hay noticias publicadas.</p>}
        </div>
      </section>

      <section className="border-t border-marino/10 bg-white">
        <div className="contenedor grid gap-6 py-12 sm:grid-cols-2">
          <Link to="/documentos" className="rounded-xl bg-papel p-7 hover:ring-2 hover:ring-marino">
            <h2 className="text-2xl font-extrabold">Documentos</h2>
            <p className="mt-2 text-lg text-tinta/80">Reglamento de copropiedad y otros documentos del edificio.</p>
          </Link>
          <Link to="/contacto" className="rounded-xl bg-papel p-7 hover:ring-2 hover:ring-marino">
            <h2 className="text-2xl font-extrabold">Contacto</h2>
            <p className="mt-2 text-lg text-tinta/80">Teléfonos y correos de la administración y grupo de WhatsApp.</p>
          </Link>
        </div>
      </section>
    </>
  )
}
