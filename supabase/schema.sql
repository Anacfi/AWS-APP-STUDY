-- Temario: secciones (categorías) y sus lecciones.
-- cert_code liga el temario a una certificación específica (ej.
-- 'SAA-C03', 'CLF-C02'); cada certificación tiene su propio set de
-- categorías independiente.
-- NOTA: categories/lessons/concepts ya no las usa la app (se
-- simplificó a solo flashcards + cuestionario por tema). Se dejan
-- aquí sin usar por si se retoma el temario más adelante.
create table categories (
  id text primary key,
  label text not null,
  short text not null,
  cert_code text not null,
  topics_completed int not null default 0,
  topics_total int not null default 0,
  percent int not null default 0,
  order_index int not null
);

create table lessons (
  id bigint generated always as identity primary key,
  category_id text not null references categories(id) on delete cascade,
  title text not null,
  minutes int not null,
  status text not null check (status in ('completed', 'in-progress', 'pending')),
  order_index int not null
);

-- Conceptos: subdivisión de cada lección en temas puntuales para
-- estudiar y marcar como leídos. "content" guarda el texto de las
-- notas/PDF de estudio una vez subidas.
create table concepts (
  id bigint generated always as identity primary key,
  lesson_id bigint not null references lessons(id) on delete cascade,
  title text not null,
  content text,
  completed boolean not null default false,
  order_index int not null
);

-- Tarjetas de repaso
create table flashcards (
  id bigint generated always as identity primary key,
  category text not null,
  front text not null,
  back text not null,
  created_at timestamptz not null default now()
);

-- Preguntas de cuestionario
create table questions (
  id bigint generated always as identity primary key,
  question text not null,
  options jsonb not null,
  correct int not null,
  explanation text not null,
  category text not null,
  created_at timestamptz not null default now()
);

-- Perfil del usuario: una sola fila (id siempre 1). Certificación
-- objetivo, fecha de examen y ritmo de estudio. A diferencia de las
-- tablas anteriores, esta se puede actualizar desde la app (sin
-- login), por eso el grant de update más abajo.
create table profile (
  id int primary key default 1,
  target_cert_code text not null,
  exam_date date not null,
  weekly_goal_hours numeric not null default 8,
  reminder_time time not null default '20:00',
  updated_at timestamptz not null default now(),
  constraint profile_single_row check (id = 1)
);

-- Lectura pública (la app no requiere login para ver el contenido).
-- Sin políticas de insert/update/delete: con RLS activo y sin esas
-- políticas, el anon key no puede escribir. La service_role key
-- (usada por el scheduler) ignora RLS por completo.
alter table categories enable row level security;
alter table lessons enable row level security;
alter table concepts enable row level security;
alter table flashcards enable row level security;
alter table questions enable row level security;
alter table profile enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read lessons" on lessons for select using (true);
create policy "Public read concepts" on concepts for select using (true);
create policy "Public update concepts" on concepts for update using (true);
create policy "Public read flashcards" on flashcards for select using (true);
create policy "Public read questions" on questions for select using (true);
create policy "Public read profile" on profile for select using (true);
create policy "Public update profile" on profile for update using (true);

-- Como "Automatically expose new tables" queda desactivado en el
-- proyecto, hay que dar el grant de lectura explícitamente para que
-- el Data API (anon key) pueda ver estas tablas. La service_role
-- key no necesita esto: ya tiene acceso completo por defecto.
grant select on categories to anon, authenticated;
grant select on lessons to anon, authenticated;
grant select, update on concepts to anon, authenticated;
grant select on flashcards to anon, authenticated;
grant select on questions to anon, authenticated;
grant select, update on profile to anon, authenticated;
