export const questions = [
  {
    question: '¿Qué significa la "S" en EC2?',
    options: ['Storage', 'Server', 'Simple', 'Compute (no lleva S)'],
    correct: 3,
    explanation:
      'EC2 son las siglas de "Elastic Compute Cloud" — la doble C se cuenta como "EC2" por las dos C consecutivas.',
  },
  {
    question: '¿Cuál de las siguientes es una partición válida de AWS?',
    options: ['aws-eu', 'aws-cn', 'aws-public', 'aws-global'],
    correct: 1,
    explanation:
      'aws-cn corresponde a las regiones de China (Pekín, Ningxia). aws-global no es una partición sino el alcance de servicios como IAM.',
  },
  {
    question: '¿Qué servicio de AWS se usa para almacenamiento de objetos?',
    options: ['EBS', 'EFS', 'S3', 'RDS'],
    correct: 2,
    explanation: 'S3 (Simple Storage Service) es el almacenamiento de objetos de AWS, duradero y escalable.',
  },
  {
    question: 'Bajo el Modelo de Responsabilidad Compartida, ¿quién asegura el hardware físico?',
    options: ['El cliente', 'AWS', 'Ambos por igual', 'Un tercero'],
    correct: 1,
    explanation:
      'AWS es responsable de la seguridad "de" la nube (infraestructura física, hardware, hipervisor); el cliente asegura lo que pone "en" la nube.',
  },
  {
    question: '¿Cuál es la unidad básica de cómputo en AWS Lambda?',
    options: ['Instancia', 'Contenedor', 'Función', 'Cluster'],
    correct: 2,
    explanation: 'Lambda ejecuta código como funciones, sin que tengas que aprovisionar ni gestionar servidores.',
  },
]
