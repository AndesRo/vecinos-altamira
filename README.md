# Vecinos Organizados Altamira

Portal informativo y privado para los vecinos del Edificio Altamira.
React + TypeScript + Tailwind CSS + Supabase (PostgreSQL, Auth, Storage) + Vercel.

Módulos: portada con la elección de nueva administración (votación presencial, solo informativo),
noticias, documentos y contacto. Acceso con una clave compartida.

## 1. Supabase
1. Crea un proyecto en https://supabase.com.
2. **SQL Editor** → pega y ejecuta `supabase/schema.sql` (tablas, seguridad, bucket privado y datos de ejemplo).
3. **Authentication → Users → Add user**: correo `vecinos@altamira.local` (o el que prefieras) y la **clave comunitaria**. Marca "Auto Confirm User".
4. **Authentication → Sign In / Providers**: desactiva **Allow new users to sign up** para que nadie más pueda crear cuentas.
5. **Storage → altamira-files**: sube los PDF (por ejemplo `brochures/administracion-a.pdf` y `documentos/reglamento.pdf`).
6. **Table Editor**: edita `election_info`, `candidates`, `news`, `documents` y `contact_items`.
   En `pdf_path` / `file_path` escribe la ruta del archivo dentro del bucket, tal cual la subiste.

## 2. Local
```bash
cp .env.example .env     # completa URL, anon key y el correo del usuario compartido
npm install
npm run dev
```

## 3. Vercel
1. Sube el proyecto a GitHub e impórtalo en Vercel (preset Vite).
2. Agrega las 3 variables de `.env.example` en **Settings → Environment Variables**.
3. Deploy. `vercel.json` ya redirige todas las rutas a `index.html`.

## Notas de seguridad
- La clave es compartida: sirve para mantener fuera a quienes no viven en el edificio, pero no identifica a cada vecino.
  Cámbiala en Supabase (Users → editar) cuando alguien deje de ser parte de la comunidad.
- Los PDF están en un bucket **privado**; se abren con enlaces firmados que expiran en 10 minutos.
- El sitio solo lee datos: las políticas RLS no permiten escribir desde el navegador.
- `robots noindex` evita que buscadores indexen el sitio.
