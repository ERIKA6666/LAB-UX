import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

export default function Diffusion() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold">Bienvenido a nuestra página</h1>
          <p className="mt-4">Esta es la página difusion con la barra de navegación horizontal.</p>

          {/* Contenido adicional para demostrar el espacio */}
          
        </div>
      </main>
      <Footer />
    </div>
  )
}

