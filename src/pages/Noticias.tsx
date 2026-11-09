import { supabase } from '../lib/supabase'
import { useQuery } from '../lib/useQuery'
import type { NewsItem } from '../types'
import PageHeader from '../components/PageHeader'
import NewsCard from '../components/NewsCard'
import { Empty, ErrorBox, Loading } from '../components/State'

export default function Noticias() {
  const news = useQuery<NewsItem[]>(() =>
    supabase.from('news').select('*').eq('published', true).order('published_at', { ascending: false }),
  )

  return (
    <>
      <PageHeader title="Últimas noticias" intro="Avisos y novedades de la comunidad del Edificio Altamira." />
      <div className="contenedor space-y-6 py-10">
        {news.loading && <Loading />}
        {news.error && <ErrorBox message={news.error} />}
        {news.data?.length === 0 && <Empty message="Aún no hay noticias publicadas." />}
        {news.data?.map((n) => <NewsCard key={n.id} item={n} full />)}
      </div>
    </>
  )
}
