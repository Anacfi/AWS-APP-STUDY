-- Perfil del usuario: una sola fila (id siempre 1). Certificación
-- objetivo, fecha de examen y ritmo de estudio. A diferencia de las
-- demás tablas, esta se puede actualizar desde la app (sin login),
-- por eso el grant de update más abajo.
create table profile (
  id int primary key default 1,
  target_cert_code text not null,
  exam_date date not null,
  weekly_goal_hours numeric not null default 8,
  reminder_time time not null default '20:00',
  updated_at timestamptz not null default now(),
  constraint profile_single_row check (id = 1)
);

alter table profile enable row level security;

create policy "Public read profile" on profile for select using (true);
create policy "Public update profile" on profile for update using (true);

grant select, update on profile to anon, authenticated;

insert into profile (id, target_cert_code, exam_date, weekly_goal_hours, reminder_time) values
(1, 'SAA-C03', '2026-08-15', 8, '20:00');
