export const flashcards = [
  {
    category: 'Particiones',
    front: '¿Qué es una partición (partition) en AWS?',
    back: 'Es un grupo de regiones que comparten un mismo conjunto de credenciales y endpoints. Ejemplos: aws (estándar), aws-cn (China), aws-us-gov (GovCloud).',
  },
  {
    category: 'IAM',
    front: '¿Qué es una política de IAM?',
    back: 'Un documento JSON que define permisos: qué acciones se permiten o deniegan, sobre qué recursos, y bajo qué condiciones.',
  },
  {
    category: 'Cómputo',
    front: '¿Qué es una AMI?',
    back: 'Amazon Machine Image: una plantilla que contiene el sistema operativo y software necesarios para lanzar una instancia EC2.',
  },
  {
    category: 'Almacenamiento',
    front: '¿Cuál es la diferencia entre S3 y EBS?',
    back: 'S3 es almacenamiento de objetos accesible vía red, ideal para archivos y backups. EBS es almacenamiento en bloque, atado a una instancia EC2 como un disco duro virtual.',
  },
  {
    category: 'Facturación',
    front: '¿Qué es el Free Tier de AWS?',
    back: 'Un conjunto de límites de uso gratuito (por 12 meses o "siempre gratis") para que los nuevos usuarios prueben servicios sin costo dentro de esos límites.',
  },
]
