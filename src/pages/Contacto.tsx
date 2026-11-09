import { supabase } from '../lib/supabase'
import { useQuery } from '../lib/useQuery'
import type { ContactItem } from '../types'
import PageHeader from '../components/PageHeader'
import { Empty, ErrorBox, Loading } from '../components/State'

function hrefFor(c: ContactItem): string {
  if (c.kind === 'email') return `mailto:${c.value}`
  if (c.kind === 'phone') return `tel:${c.value.replace(/[^+\d]/g, '')}`
  if (/^https?:\/\//i.test(c.value)) return c.value
  return `https://wa.me/${c.value.replace(/\D/g, '')}`
}

function displayFor(c: ContactItem): string {
  if (c.kind === 'whatsapp' && /^https?:\/\//i.test(c.value)) return 'Unirme al grupo'
  return c.value
}

const actionLabel: Record<ContactItem['kind'], string> = {
  phone: 'Llamar',
  email: 'Escribir correo',
  whatsapp: 'Abrir WhatsApp',
}

export default function Contacto() {
  const contacts = useQuery<ContactItem[]>(() => supabase.from('contact_items').select('*').order('sort_order'))

  return (
    <>
      <PageHeader title="Contacto" intro="Cómo comunicarte con la administración y con otros vecinos." />
      <div className="contenedor py-10">
        {contacts.loading && <Loading />}
        {contacts.error && <ErrorBox message={contacts.error} />}
        {contacts.data?.length === 0 && <Empty message="Aún no hay datos de contacto publicados." />}

        <div className="grid gap-6 sm:grid-cols-2">
          {contacts.data?.map((c) => (
            <article key={c.id} className="rounded-xl border border-marino/10 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold">{c.label}</h2>
              <p className="mt-3 break-words text-2xl font-bold text-medio">{displayFor(c)}</p>
              {c.note && <p className="mt-2 text-lg text-tinta/75">{c.note}</p>}
              <a
                href={hrefFor(c)}
                target={c.kind === 'whatsapp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="btn btn-secundario mt-5"
              >
                {actionLabel[c.kind]}
              </a>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
