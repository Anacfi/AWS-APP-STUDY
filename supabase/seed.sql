insert into categories (id, label, short, topics_completed, topics_total, percent, order_index) values
('fundamentos', 'Fundamentos', 'Fn', 18, 24, 75, 1),
('computo', 'Cómputo', 'Ec', 21, 38, 55, 2),
('almacenamiento', 'Almacenamiento', 'S3', 12, 26, 46, 3),
('bases-de-datos', 'Bases de datos', 'Db', 9, 31, 29, 4),
('redes', 'Redes', 'Vp', 14, 29, 48, 5),
('seguridad', 'Seguridad', 'Iam', 11, 34, 32, 6);

insert into lessons (category_id, title, minutes, status, order_index) values
('fundamentos', 'Regiones y Zonas de Disponibilidad', 10, 'completed', 1),
('fundamentos', 'Particiones & ARNs', 14, 'in-progress', 2),
('fundamentos', 'Modelo de responsabilidad compartida', 9, 'pending', 3),
('fundamentos', 'Facturación, precios y soporte', 12, 'pending', 4),
('fundamentos', 'AWS Well-Architected Framework', 16, 'pending', 5),

('computo', 'Tipos de instancias EC2', 12, 'completed', 1),
('computo', 'AMIs y almacenamiento de instancias', 10, 'completed', 2),
('computo', 'Auto Scaling y Elastic Load Balancing', 15, 'in-progress', 3),
('computo', 'AWS Lambda y cómputo serverless', 11, 'pending', 4),
('computo', 'Contenedores: ECS y EKS', 13, 'pending', 5),

('almacenamiento', 'S3: clases de almacenamiento', 10, 'completed', 1),
('almacenamiento', 'EBS vs Instance Store', 8, 'in-progress', 2),
('almacenamiento', 'EFS y almacenamiento compartido', 9, 'pending', 3),
('almacenamiento', 'Políticas de ciclo de vida en S3', 7, 'pending', 4),

('bases-de-datos', 'RDS y motores soportados', 11, 'completed', 1),
('bases-de-datos', 'DynamoDB: conceptos clave', 13, 'in-progress', 2),
('bases-de-datos', 'Aurora vs RDS', 9, 'pending', 3),
('bases-de-datos', 'ElastiCache y caching', 8, 'pending', 4),

('redes', 'VPC: subredes y CIDR', 12, 'completed', 1),
('redes', 'Internet Gateway y NAT Gateway', 10, 'completed', 2),
('redes', 'Security Groups vs NACLs', 9, 'in-progress', 3),
('redes', 'Route 53 y DNS', 8, 'pending', 4),

('seguridad', 'IAM: usuarios, grupos y roles', 10, 'completed', 1),
('seguridad', 'Políticas y permisos', 11, 'in-progress', 2),
('seguridad', 'AWS Shield y WAF', 9, 'pending', 3),
('seguridad', 'KMS y cifrado', 10, 'pending', 4);

insert into flashcards (category, front, back) values
('Particiones', '¿Qué es una partición (partition) en AWS?', 'Es un grupo de regiones que comparten un mismo conjunto de credenciales y endpoints. Ejemplos: aws (estándar), aws-cn (China), aws-us-gov (GovCloud).'),
('IAM', '¿Qué es una política de IAM?', 'Un documento JSON que define permisos: qué acciones se permiten o deniegan, sobre qué recursos, y bajo qué condiciones.'),
('Cómputo', '¿Qué es una AMI?', 'Amazon Machine Image: una plantilla que contiene el sistema operativo y software necesarios para lanzar una instancia EC2.'),
('Almacenamiento', '¿Cuál es la diferencia entre S3 y EBS?', 'S3 es almacenamiento de objetos accesible vía red, ideal para archivos y backups. EBS es almacenamiento en bloque, atado a una instancia EC2 como un disco duro virtual.'),
('Facturación', '¿Qué es el Free Tier de AWS?', 'Un conjunto de límites de uso gratuito (por 12 meses o "siempre gratis") para que los nuevos usuarios prueben servicios sin costo dentro de esos límites.');

insert into questions (question, options, correct, explanation) values
('¿Qué significa la "S" en EC2?', '["Storage", "Server", "Simple", "Compute (no lleva S)"]', 3, 'EC2 son las siglas de "Elastic Compute Cloud" — la doble C se cuenta como "EC2" por las dos C consecutivas.'),
('¿Cuál de las siguientes es una partición válida de AWS?', '["aws-eu", "aws-cn", "aws-public", "aws-global"]', 1, 'aws-cn corresponde a las regiones de China (Pekín, Ningxia). aws-global no es una partición sino el alcance de servicios como IAM.'),
('¿Qué servicio de AWS se usa para almacenamiento de objetos?', '["EBS", "EFS", "S3", "RDS"]', 2, 'S3 (Simple Storage Service) es el almacenamiento de objetos de AWS, duradero y escalable.'),
('Bajo el Modelo de Responsabilidad Compartida, ¿quién asegura el hardware físico?', '["El cliente", "AWS", "Ambos por igual", "Un tercero"]', 1, 'AWS es responsable de la seguridad "de" la nube (infraestructura física, hardware, hipervisor); el cliente asegura lo que pone "en" la nube.'),
('¿Cuál es la unidad básica de cómputo en AWS Lambda?', '["Instancia", "Contenedor", "Función", "Cluster"]', 2, 'Lambda ejecuta código como funciones, sin que tengas que aprovisionar ni gestionar servidores.');

insert into profile (id, target_cert_code, exam_date, weekly_goal_hours, reminder_time) values
(1, 'SAA-C03', '2026-08-15', 8, '20:00');
