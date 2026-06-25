-- Escala el temario por certificación: cada categoría queda ligada
-- a un cert_code. Las 6 categorías existentes eran (implícitamente)
-- de Solutions Architect — se etiquetan ahora explícitamente.
alter table categories add column cert_code text not null default 'SAA-C03';

-- Conceptos: subdivisión de cada lección en temas puntuales para
-- estudiar y marcar como leídos. "content" guarda el texto de tus
-- notas/PDF una vez que se suban. Igual que profile, se puede
-- actualizar desde la app (sin login) para marcar conceptos leídos.
create table concepts (
  id bigint generated always as identity primary key,
  lesson_id bigint not null references lessons(id) on delete cascade,
  title text not null,
  content text,
  completed boolean not null default false,
  order_index int not null
);

alter table concepts enable row level security;
create policy "Public read concepts" on concepts for select using (true);
create policy "Public update concepts" on concepts for update using (true);
grant select, update on concepts to anon, authenticated;

-- Categoría Fundamentos para Cloud Practitioner (CLF-C02).
-- topics_total = conteo de conceptos (39), no de lecciones (12).
insert into categories (id, label, short, cert_code, topics_completed, topics_total, percent, order_index) values
('clf-fundamentos', 'Fundamentos', 'Fn', 'CLF-C02', 0, 39, 0, 1);

insert into lessons (category_id, title, minutes, status, order_index) values
('clf-fundamentos', 'Qué es la computación en la nube', 12, 'pending', 1),
('clf-fundamentos', 'Infraestructura global de AWS', 14, 'pending', 2),
('clf-fundamentos', 'Particiones de AWS y ARNs', 8, 'pending', 3),
('clf-fundamentos', 'Modelo de Responsabilidad Compartida', 9, 'pending', 4),
('clf-fundamentos', 'AWS Well-Architected Framework', 15, 'pending', 5),
('clf-fundamentos', 'Economía de la nube', 10, 'pending', 6),
('clf-fundamentos', 'Modelos de precios de AWS', 14, 'pending', 7),
('clf-fundamentos', 'Facturación y herramientas de costos', 12, 'pending', 8),
('clf-fundamentos', 'AWS Organizations y facturación consolidada', 8, 'pending', 9),
('clf-fundamentos', 'Planes de soporte de AWS', 10, 'pending', 10),
('clf-fundamentos', 'AWS Cloud Adoption Framework (CAF) y migración', 11, 'pending', 11),
('clf-fundamentos', 'AWS Marketplace', 6, 'pending', 12);

insert into concepts (lesson_id, title, order_index)
select l.id, c.concept_title, c.idx
from lessons l
join (values
  ('Qué es la computación en la nube', 'Modelos de despliegue (pública/privada/híbrida)', 1),
  ('Qué es la computación en la nube', 'Modelos de servicio (IaaS/PaaS/SaaS)', 2),
  ('Qué es la computación en la nube', 'Beneficios clave de la nube', 3),

  ('Infraestructura global de AWS', 'Regiones', 1),
  ('Infraestructura global de AWS', 'Zonas de Disponibilidad', 2),
  ('Infraestructura global de AWS', 'Edge Locations', 3),
  ('Infraestructura global de AWS', 'Local Zones', 4),
  ('Infraestructura global de AWS', 'Wavelength', 5),

  ('Particiones de AWS y ARNs', 'Particiones de AWS (aws, aws-cn, aws-us-gov)', 1),
  ('Particiones de AWS y ARNs', 'Estructura de un ARN', 2),

  ('Modelo de Responsabilidad Compartida', 'Responsabilidad de AWS ("de" la nube)', 1),
  ('Modelo de Responsabilidad Compartida', 'Responsabilidad del cliente ("en" la nube)', 2),

  ('AWS Well-Architected Framework', 'Excelencia operacional', 1),
  ('AWS Well-Architected Framework', 'Seguridad', 2),
  ('AWS Well-Architected Framework', 'Confiabilidad', 3),
  ('AWS Well-Architected Framework', 'Eficiencia de rendimiento', 4),
  ('AWS Well-Architected Framework', 'Optimización de costos', 5),
  ('AWS Well-Architected Framework', 'Sostenibilidad', 6),

  ('Economía de la nube', 'CapEx vs OpEx', 1),
  ('Economía de la nube', 'Economías de escala', 2),
  ('Economía de la nube', 'Costo total de propiedad (TCO)', 3),

  ('Modelos de precios de AWS', 'On-Demand', 1),
  ('Modelos de precios de AWS', 'Reserved Instances', 2),
  ('Modelos de precios de AWS', 'Spot Instances', 3),
  ('Modelos de precios de AWS', 'Savings Plans', 4),
  ('Modelos de precios de AWS', 'Free Tier', 5),

  ('Facturación y herramientas de costos', 'AWS Cost Explorer', 1),
  ('Facturación y herramientas de costos', 'AWS Budgets', 2),
  ('Facturación y herramientas de costos', 'Cost and Usage Report', 3),
  ('Facturación y herramientas de costos', 'AWS Pricing Calculator', 4),

  ('AWS Organizations y facturación consolidada', 'AWS Organizations', 1),
  ('AWS Organizations y facturación consolidada', 'Facturación consolidada', 2),

  ('Planes de soporte de AWS', 'Basic', 1),
  ('Planes de soporte de AWS', 'Developer', 2),
  ('Planes de soporte de AWS', 'Business', 3),
  ('Planes de soporte de AWS', 'Enterprise', 4),

  ('AWS Cloud Adoption Framework (CAF) y migración', 'AWS Cloud Adoption Framework (CAF)', 1),
  ('AWS Cloud Adoption Framework (CAF) y migración', 'Estrategias de migración (las 6 R''s)', 2),

  ('AWS Marketplace', 'AWS Marketplace', 1)
) as c(lesson_title, concept_title, idx) on c.lesson_title = l.title
where l.category_id = 'clf-fundamentos';
