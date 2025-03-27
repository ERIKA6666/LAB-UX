import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import {Button} from "@/components/ui/button"
import { Image } from "lucide-react"

import { Carousel } from "@/components/ui/carousel"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Carousel/>
        <div className="container mx-auto mt-8 px-4">
          {/* Contenido adicional para demostrar el espacio */}
        </div>
      </main>
    </div>
  )
}
