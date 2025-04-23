// Home

import { title } from "process"

// Datos de ejemplo para el carrusel
export const slides = [
    {
      id: 1,
      title: "Soluciones innovadoras para tu negocio",
      description: "Descubre cómo podemos ayudarte a crecer y alcanzar tus objetivos",
      bgColor: "bg-primary/90",
    },
    {
      id: 2,
      title: "Productos de alta calidad",
      description: "Diseñados para satisfacer las necesidades más exigentes del mercado",
      bgColor: "bg-secondary/90",
    },
    {
      id: 3,
      title: "Servicio personalizado",
      description: "Atención dedicada para cada uno de nuestros clientes",
      bgColor: "bg-accent/90",
    },
  ]

export const mision = {
    title: "Nuestra Misión",
    textOne: "Proporcionar soluciones innovadoras y de alta calidad que transformen la manera en que nuestros clientes interactúan con la tecnología, facilitando su crecimiento y éxito en un mundo digital en constante evolución.",
    textTwo: "Nos comprometemos a ofrecer un servicio excepcional, mantener los más altos estándares éticos y contribuir positivamente a las comunidades en las que operamos.",
    image: "/placeholder.svg?height=400&width=600"
}
export const vision = {
    title: "Nuestra Visión",
    textOne: "Proporcionar soluciones innovadoras y de alta calidad que transformen la manera en que nuestros clientes interactúan con la tecnología, facilitando su crecimiento y éxito en un mundo digital en constante evoluciónSer reconocidos globalmente como líderes en innovación tecnológica, estableciendo nuevos estándares de excelencia en nuestra industria y siendo la primera opción para clientes que buscan soluciones transformadoras.",
    textTwo: "Aspiramos a crear un futuro donde la tecnología mejore la vida de las personas, impulse el progreso sostenible y genere oportunidades para todos.",
    image: "/placeholder.svg?height=400&width=600"
}

export const valores = [
  {
    iconoPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    titulo: "Integridad",
    descripcion: "Actuamos con honestidad, transparencia y ética en todas nuestras interacciones, manteniendo los más altos estándares de conducta profesional."
  },
  {
    iconoPath: "M13 10V3L4 14h7v7l9-11h-7z",
    titulo: "Innovación",
    descripcion: "Fomentamos la creatividad y el pensamiento disruptivo, buscando constantemente nuevas formas de resolver problemas y crear valor para nuestros clientes."
  },
  {
    iconoPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    titulo: "Colaboración",
    descripcion: "Trabajamos juntos como un equipo unificado, valorando la diversidad de perspectivas y habilidades para lograr resultados excepcionales."
  },
  {
    iconoPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    titulo: "Excelencia",
    descripcion: "Nos esforzamos por alcanzar los más altos niveles de calidad en todo lo que hacemos, superando constantemente las expectativas de nuestros clientes."
  },
  {
    iconoPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    titulo: "Responsabilidad",
    descripcion: "Asumimos la responsabilidad de nuestras acciones y decisiones, cumpliendo nuestros compromisos con clientes, empleados y comunidades."
  },
  {
    iconoPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5",
    titulo: "Sostenibilidad",
    descripcion: "Nos comprometemos a operar de manera sostenible, minimizando nuestro impacto ambiental y contribuyendo positivamente al bienestar social y económico."
  }
];
export const team = [
  {
    id: 1,
    nombre: "Dr. Carlos Mendoza",
    role: "Profesor de Matemáticas",
    bio: "Doctor en Matemáticas Aplicadas con 15 años de experiencia en educación superior.",
    foto: "/placeholder.svg?height=300&width=300",
    email: " juan.perez@universidad.edu",
    oficina: "Edificio de Ciencias, Sala 305",
    formacion: [
      "Doctorado en Ciencias Computacionales; Universidad Nacional, 2010-2014",
      "Maestría en Inteligencia Artificial; Universidad Tecnológica, 2008-2010",
      "Licenciatura en Ingeniería Informática, Universidad Estatal, 2004-2008"
    ],
    publicaciones: [
      "Avances en Algoritmos de Aprendizaje Profundo, Revista de IA, 2022",
      "Optimización de Redes Neuronales para Procesamiento de Lenguaje Natural, Conferencia Internacional de Computación, 2020",
      "Métodos Eficientes para Análisis de Grandes Volúmenes de Datos, Journal of Data Science, 2018"
    ]
  },
]
//Investigacion
/////Proyectos 
// Datos de ejemplo
export const proyectos = [
  {
    titulo: "Análisis de Experiencia de Usuario en Aplicaciones Móviles",
    descripcionCorta: "Estudio de patrones de interacción",
    descripcion:
      "Investigación sobre cómo los usuarios interactúan con diferentes interfaces móviles y qué elementos mejoran la experiencia general.",
    descripcionDetallada:
      "Este proyecto investiga en profundidad los patrones de interacción de usuarios con aplicaciones móviles. Analizamos factores como el tiempo de permanencia, patrones de navegación, y puntos de fricción para identificar oportunidades de mejora en la experiencia del usuario. Utilizamos metodologías mixtas que incluyen pruebas de usabilidad, análisis de datos y entrevistas con usuarios.",
    etiquetas: ["UX", "Móvil", "Interacción"],
    imagen: "/placeholder.svg?height=200&width=400",
    imagenes: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800&text=Imagen+2",
      "/placeholder.svg?height=400&width=800&text=Imagen+3",
    ],
    estado: "En progreso",
    fechaInicio: "15/01/2023",
    fechaFin: "30/06/2023",
    progreso: 65,
    colaboradores: [
      {
        nombre: "Ana",
        apellido: "Martínez",
        rol: "Investigadora Principal",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Carlos",
        apellido: "Rodríguez",
        rol: "Diseñador UX",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Elena",
        apellido: "Gómez",
        rol: "Analista de Datos",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    titulo: "Optimización de Interfaces para Accesibilidad",
    descripcionCorta: "Mejorando la accesibilidad web",
    descripcion:
      "Proyecto enfocado en desarrollar guías y prácticas para crear interfaces web accesibles para personas con diferentes capacidades.",
    descripcionDetallada:
      "Este proyecto busca establecer estándares y mejores prácticas para el diseño de interfaces web accesibles. Trabajamos con usuarios con diversas capacidades para entender sus necesidades específicas y desarrollar soluciones que mejoren su experiencia digital. El resultado será una guía completa de implementación de accesibilidad para desarrolladores y diseñadores.",
    etiquetas: ["Accesibilidad", "Inclusión", "Diseño"],
    imagen: "/placeholder.svg?height=200&width=400",
    imagenes: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800&text=Accesibilidad+2",
      "/placeholder.svg?height=400&width=800&text=Accesibilidad+3",
      "/placeholder.svg?height=400&width=800&text=Accesibilidad+4",
    ],
    estado: "Completado",
    fechaInicio: "10/03/2022",
    fechaFin: "15/12/2022",
    progreso: 100,
    colaboradores: [
      {
        nombre: "Miguel",
        apellido: "Sánchez",
        rol: "Especialista en Accesibilidad",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Laura",
        apellido: "Fernández",
        rol: "Desarrolladora Frontend",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    titulo: "Patrones de Navegación en Comercio Electrónico",
    descripcionCorta: "Análisis de comportamiento de compra",
    descripcion:
      "Estudio sobre cómo los usuarios navegan por sitios de comercio electrónico y qué factores influyen en las decisiones de compra.",
    descripcionDetallada:
      "Esta investigación analiza los patrones de navegación y comportamiento de compra en plataformas de comercio electrónico. Estudiamos el recorrido del usuario desde que ingresa al sitio hasta que completa una compra, identificando puntos de abandono y oportunidades para optimizar la conversión. Utilizamos mapas de calor, análisis de embudos y pruebas A/B para obtener insights accionables.",
    etiquetas: ["E-commerce", "Navegación", "Conversión"],
    imagen: "/placeholder.svg?height=200&width=400",
    imagenes: ["/placeholder.svg?height=400&width=800", "/placeholder.svg?height=400&width=800&text=E-commerce+2"],
    estado: "En progreso",
    fechaInicio: "05/09/2022",
    fechaFin: "30/07/2023",
    progreso: 80,
    colaboradores: [
      {
        nombre: "Javier",
        apellido: "López",
        rol: "Analista de Conversión",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Sofía",
        apellido: "Torres",
        rol: "Especialista en Marketing Digital",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Daniel",
        apellido: "Ruiz",
        rol: "Desarrollador Full Stack",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    titulo: "Diseño Centrado en el Usuario para Aplicaciones Educativas",
    descripcionCorta: "Mejorando experiencias de aprendizaje",
    descripcion:
      "Investigación sobre cómo optimizar interfaces educativas para mejorar la retención de información y la experiencia de aprendizaje.",
    descripcionDetallada:
      "Este proyecto investiga cómo el diseño de interfaces educativas afecta la retención de información y la experiencia general de aprendizaje. Trabajamos con estudiantes y educadores para desarrollar principios de diseño que mejoren la efectividad de las plataformas educativas digitales, considerando factores como la presentación de contenido, interactividad y sistemas de retroalimentación.",
    etiquetas: ["Educación", "Aprendizaje", "DCU"],
    imagen: "/placeholder.svg?height=200&width=400",
    imagenes: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800&text=Educación+2",
      "/placeholder.svg?height=400&width=800&text=Educación+3",
    ],
    estado: "Planificado",
    fechaInicio: "01/08/2023",
    fechaFin: "15/03/2024",
    progreso: 15,
    colaboradores: [
      {
        nombre: "Patricia",
        apellido: "Navarro",
        rol: "Pedagoga Digital",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Roberto",
        apellido: "García",
        rol: "Diseñador de Experiencia",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    titulo: "Evaluación Heurística de Plataformas Gubernamentales",
    descripcionCorta: "Mejorando servicios públicos digitales",
    descripcion:
      "Análisis de usabilidad de plataformas de gobierno digital para identificar problemas y proponer mejoras.",
    descripcionDetallada:
      "Este proyecto realiza una evaluación exhaustiva de las plataformas de gobierno digital utilizando principios heurísticos de usabilidad. Identificamos barreras que dificultan el acceso a servicios públicos digitales y proponemos soluciones concretas para mejorar la experiencia ciudadana. El objetivo es hacer que los servicios gubernamentales sean más accesibles e intuitivos para todos los ciudadanos.",
    etiquetas: ["Gobierno Digital", "Evaluación", "Servicios Públicos"],
    imagen: "/placeholder.svg?height=200&width=400",
    imagenes: ["/placeholder.svg?height=400&width=800", "/placeholder.svg?height=400&width=800&text=Gobierno+2"],
    estado: "En pausa",
    fechaInicio: "10/11/2022",
    fechaFin: "Pendiente",
    progreso: 45,
    colaboradores: [
      {
        nombre: "Marta",
        apellido: "Jiménez",
        rol: "Consultora de Usabilidad",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Alejandro",
        apellido: "Díaz",
        rol: "Especialista en Gobierno Digital",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    titulo: "Impacto del Diseño Minimalista en la Usabilidad",
    descripcionCorta: "Análisis de tendencias de diseño",
    descripcion:
      "Estudio sobre cómo las tendencias de diseño minimalista afectan la usabilidad y la percepción del usuario.",
    descripcionDetallada:
      "Esta investigación examina el impacto del diseño minimalista en la usabilidad y percepción de los usuarios. Analizamos cómo la simplificación de interfaces afecta la eficiencia, la satisfacción y la comprensión de los usuarios. El estudio compara interfaces minimalistas con diseños más tradicionales para determinar en qué contextos cada enfoque resulta más efectivo.",
    etiquetas: ["Minimalismo", "Tendencias", "Percepción"],
    imagen: "/placeholder.svg?height=200&width=400",
    imagenes: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800&text=Minimalismo+2",
      "/placeholder.svg?height=400&width=800&text=Minimalismo+3",
    ],
    estado: "Completado",
    fechaInicio: "20/02/2022",
    fechaFin: "30/10/2022",
    progreso: 100,
    colaboradores: [
      {
        nombre: "Isabel",
        apellido: "Moreno",
        rol: "Diseñadora UI/UX",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Pablo",
        apellido: "Herrera",
        rol: "Investigador UX",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        nombre: "Lucía",
        apellido: "Castro",
        rol: "Psicóloga Cognitiva",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
]
//admin data 

