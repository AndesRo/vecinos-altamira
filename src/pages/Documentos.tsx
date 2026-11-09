import { supabase } from '../lib/supabase'
import { useQuery } from '../lib/useQuery'
import type { DocItem } from '../types'
import PageHeader from '../components/PageHeader'
import FileButtons from '../components/FileButtons'
import { Empty, ErrorBox, Loading } from '../components/State'

export default function Documentos() {
  const docs = useQuery<DocItem[]>(() =>
    supabase.from('documents').select('*').eq('published', true).order('category').order('title'),
  )

  const groups = (docs.data ?? []).reduce<Record<string, DocItem[]>>((acc, d) => {
    ;(acc[d.category] ||= []).push(d)
    return acc
  }, {})

  return (
    <>
      <PageHeader title="Documentos" intro="Reglamentos y otros documentos del edificio, disponibles para consulta y descarga." />
      <div className="contenedor py-10">
        {docs.loading && <Loading />}
        {docs.error && <ErrorBox message={docs.error} />}
        {docs.data?.length === 0 && <Empty message="Aún no hay documentos publicados." />}

        {Object.entries(groups).map(([category, items]) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-extrabold">{category}</h2>
            <div className="mt-5 space-y-5">
              {items.map((d) => (
                <article key={d.id} className="rounded-xl border border-marino/10 bg-white p-6 sm:p-8">
                  <h3 className="text-2xl font-extrabold">{d.title}</h3>
                  {d.description && <p className="mt-2 text-xl leading-relaxed text-tinta/80">{d.description}</p>}
                  <div className="mt-5">
                    <FileButtons path={d.file_path} label="Ver documento" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
