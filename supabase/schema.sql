-- Vecinos Organizados Altamira - esquema PostgreSQL / Supabase
-- Ejecutar completo en Supabase > SQL Editor.

-- ========== TABLAS ==========
create table if not exists public.election_info (
  id int primary key default 1 check (id = 1),
  title text not null default 'Elección de nueva administración',
  intro text not null default '',
  date_text text not null default 'Por confirmar',
  time_text text not null default 'Por confirmar',
  place text not null default 'Por confirmar',
  note text not null default 'La votación es presencial. Este sitio es solo informativo.'
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  summary text not null,
  highlights text[] not null default '{}',
  pdf_path text,                       -- ruta dentro del bucket, ej: brochures/administracion-a.pdf
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  body text,
  published_at timestamptz not null default now(),
  published boolean not null default true
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'General',
  file_path text not null,             -- ruta dentro del bucket, ej: documentos/reglamento.pdf
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  kind text not null check (kind in ('phone', 'email', 'whatsapp')),
  value text not null,                 -- telefono, correo, o enlace de invitacion de WhatsApp
  note text,
  sort_order int not null default 0
);

-- ========== SEGURIDAD (RLS) ==========
-- Solo el usuario compartido (rol authenticated) puede LEER. Nadie puede escribir desde el sitio.
-- El contenido se edita desde el panel de Supabase (Table Editor / Storage).
alter table public.election_info enable row level security;
alter table public.candidates enable row level security;
alter table public.news enable row level security;
alter table public.documents enable row level security;
alter table public.contact_items enable row level security;

drop policy if exists "vecinos leen election_info" on public.election_info;
drop policy if exists "vecinos leen candidates" on public.candidates;
drop policy if exists "vecinos leen news" on public.news;
drop policy if exists "vecinos leen documents" on public.documents;
drop policy if exists "vecinos leen contact_items" on public.contact_items;

create policy "vecinos leen election_info" on public.election_info for select to authenticated using (true);
create policy "vecinos leen candidates" on public.candidates for select to authenticated using (published);
create policy "vecinos leen news" on public.news for select to authenticated using (published);
create policy "vecinos leen documents" on public.documents for select to authenticated using (published);
create policy "vecinos leen contact_items" on public.contact_items for select to authenticated using (true);

-- ========== ALMACENAMIENTO PRIVADO (PDF) ==========
insert into storage.buckets (id, name, public)
values ('altamira-files', 'altamira-files', false)
on conflict (id) do nothing;

drop policy if exists "vecinos leen archivos" on storage.objects;
create policy "vecinos leen archivos" on storage.objects
  for select to authenticated using (bucket_id = 'altamira-files');

-- ========== DATOS DE EJEMPLO (reemplazar desde el Table Editor) ==========
insert into public.election_info (id, intro, date_text, time_text, place) values
  (1, 'Conoce a cada administración participante, lee el resumen de su brochure y revisa el documento completo antes de votar.',
   'Por confirmar', 'Por confirmar', 'Por confirmar')
on conflict (id) do nothing;

insert into public.candidates (name, tagline, summary, highlights, sort_order) values
  ('Administración A (ejemplo)', 'Frase breve de la propuesta',
   'Reemplaza este texto por el resumen del brochure. Puedes usar varios párrafos separados por una línea en blanco.',
   array['Primer punto principal', 'Segundo punto principal', 'Tercer punto principal'], 1),
  ('Administración B (ejemplo)', 'Frase breve de la propuesta',
   'Reemplaza este texto por el resumen del brochure.',
   array['Primer punto principal', 'Segundo punto principal'], 2);

insert into public.news (title, summary, body) values
  ('Bienvenidos al portal de la comunidad', 'Aquí encontrarás noticias, documentos y la información de la elección.', null);

insert into public.contact_items (label, kind, value, note, sort_order) values
  ('Teléfono de administración', 'phone', '+56 9 0000 0000', 'Lunes a viernes, horario de oficina', 1),
  ('Correo de administración', 'email', 'administracion@ejemplo.cl', null, 2),
  ('Grupo de WhatsApp de vecinos', 'whatsapp', '+56 9 0000 0000', 'Grupo comunitario. Puedes pegar aquí el enlace de invitación del grupo.', 3);
