import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useQuery } from '../lib/useQuery'
import type { Candidate, ElectionInfo } from '../types'
import PageHeader from '../components/PageHeader'
import ElectionBox from '../components/ElectionBox'
import FileButtons from '../components/FileButtons'
import { Empty, ErrorBox, Loading } from '../components/State'

export default function Eleccion() {
  const election = useQuery<ElectionInfo>(() => supabase.from('election_info').select('*').eq('id', 1).maybeSingle())
  const candidates = useQuery<Candidate[]>(() => supabase.from('candidates').select('*').eq('published', true).order('sort_order'))
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash || !candidates.data) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [hash, candidates.data])

  return (
    <>
      <PageHeader
        title={election.data?.title ?? 'Elección de nueva administración'}
        intro={election.data?.intro ?? 'Revisa la propuesta de cada administración antes del día de la votación.'}
      />

      <div className="contenedor py-10">
        {election.data && (
          <section aria-labelledby="como-votar" className="rounded-2xl border border-marino/10 bg-white p-6 sm:p-8">
            <h2 id="como-votar" className="text-3xl font-extrabold">
              Cómo y cuándo se vota
            </h2>
            <div className="mt-5">
              <ElectionBox info={election.data} />
            </div>
            <p className="mt-5 text-xl leading-relaxed">{election.data.note}</p>
          </section>
        )}
        {election.error && <ErrorBox message={election.error} />}

        <h2 className="mt-14 text-3xl font-extrabold sm:text-4xl">Administraciones participantes</h2>
        <p className="mt-2 text-lg text-tinta/75">Se muestran en un orden fijo definido por la comunidad.</p>

        {candidates.loading && <Loading />}
        {candidates.error && <ErrorBox message={candidates.error} />}
        {candidates.data?.length === 0 && (
          <div className="mt-6">
            <Empty message="Todavía no hay administraciones publicadas. Vuelve pronto." />
          </div>
        )}

        <div className="mt-8 space-y-8">
          {candidates.data?.map((c) => (
            <article key={c.id} id={c.id} className="scroll-mt-28 rounded-2xl border border-marino/10 bg-white p-6 sm:p-10">
              <h3 className="text-3xl font-extrabold sm:text-4xl">{c.name}</h3>
              {c.tagline && <p className="mt-2 text-xl font-semibold text-medio">{c.tagline}</p>}

              <h4 className="mt-8 text-2xl font-bold text-marino">Resumen del brochure</h4>
              <p className="mt-3 max-w-3xl whitespace-pre-line text-xl leading-relaxed text-tinta/90">{c.summary}</p>

              {c.highlights.length > 0 && (
                <>
                  <h4 className="mt-8 text-2xl font-bold text-marino">Puntos principales</h4>
                  <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-6 text-xl leading-relaxed marker:text-dorado">
                    {c.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-8 border-t border-marino/10 pt-6">
                {c.pdf_path ? (
                  <FileButtons path={c.pdf_path} label="Ver brochure completo" />
                ) : (
                  <p className="text-lg text-tinta/70">El brochure en PDF aún no está disponible.</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
