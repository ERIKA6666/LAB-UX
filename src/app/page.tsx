import { Carousel } from "@/components/ui/carousel"
import Image from "next/image"


export default function Home() {
  return (
    <main>
      {/* Banner Carrusel */}
      <Carousel />

      {/* Sección de Misión - Texto a la izquierda, imagen a la derecha */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Texto de la Misión */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-2">Nuestra Misión</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-lg font-thin mb-4">
                Proporcionar soluciones innovadoras y de alta calidad que transformen la manera en que nuestros clientes
                interactúan con la tecnología, facilitando su crecimiento y éxito en un mundo digital en constante
                evolución.
              </p>
              <p className="text-lg font-thin">
                Nos comprometemos a ofrecer un servicio excepcional, mantener los más altos estándares éticos y
                contribuir positivamente a las comunidades en las que operamos.
              </p>
            </div>

            {/* Imagen de la Misión */}
            <div className="order-1 md:order-2">
              <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Nuestra Misión"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Visión - Imagen a la izquierda, texto a la derecha */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Imagen de la Visión */}
            <div>
              <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Nuestra Visión"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Texto de la Visión */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Nuestra Visión</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-lg font-thin mb-4">
                Ser reconocidos globalmente como líderes en innovación tecnológica, estableciendo nuevos estándares de
                excelencia en nuestra industria y siendo la primera opción para clientes que buscan soluciones
                transformadoras.
              </p>
              <p className="text-lg font-thin">
                Aspiramos a crear un futuro donde la tecnología mejore la vida de las personas, impulse el progreso
                sostenible y genere oportunidades para todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Valores - Se mantiene igual */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Nuestros Valores</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Valor 1 */}
            <div className=" p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Integridad</h3>
              <p className="font-thin">
                Actuamos con honestidad, transparencia y ética en todas nuestras interacciones, manteniendo los más
                altos estándares de conducta profesional.
              </p>
            </div>

            {/* Valor 2 */}
            <div className=" p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovación</h3>
              <p className="font-thin">
                Fomentamos la creatividad y el pensamiento disruptivo, buscando constantemente nuevas formas de resolver
                problemas y crear valor para nuestros clientes.
              </p>
            </div>

            {/* Valor 3 */}
            <div className=" p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Colaboración</h3>
              <p className="font-thin">
                Trabajamos juntos como un equipo unificado, valorando la diversidad de perspectivas y habilidades para
                lograr resultados excepcionales.
              </p>
            </div>

            {/* Valor 4 */}
            <div className=" p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excelencia</h3>
              <p className="font-thin">
                Nos esforzamos por alcanzar los más altos niveles de calidad en todo lo que hacemos, superando
                constantemente las expectativas de nuestros clientes.
              </p>
            </div>

            {/* Valor 5 */}
            <div className="p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Responsabilidad</h3>
              <p className="font-thin">
                Asumimos la responsabilidad de nuestras acciones y decisiones, cumpliendo nuestros compromisos con
                clientes, empleados y comunidades.
              </p>
            </div>

            {/* Valor 6 */}
            <div className=" p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sostenibilidad</h3>
              <p className="font-thin">
                Nos comprometemos a operar de manera sostenible, minimizando nuestro impacto ambiental y contribuyendo
                positivamente al bienestar social y económico.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

