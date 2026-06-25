-- Tema simple para organizar preguntas (flashcards ya tenía "category").
-- Sin lecciones ni conceptos: solo una etiqueta para filtrar/organizar.
alter table questions add column category text;

update questions set category = 'Cómputo' where question ilike '%"S" en EC2%';
update questions set category = 'Fundamentos' where question ilike '%partición válida%';
update questions set category = 'Almacenamiento' where question ilike '%almacenamiento de objetos%';
update questions set category = 'Fundamentos' where question ilike '%Responsabilidad Compartida%';
update questions set category = 'Cómputo' where question ilike '%AWS Lambda%';

alter table questions alter column category set not null;
