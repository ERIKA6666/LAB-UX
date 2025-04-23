"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Perfil } from "@/types/perfil"

interface ModalCvProps {
  perfil: Perfil;
}

export function ModalCv({ perfil }: ModalCvProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Ver Curriculum Vitae</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-background text-white">
        <div className="flex flex-col md:flex-row h-[80vh]">
          {/* Imagen del profesor - lado izquierdo */}
          <div className="w-full md:w-1/3 h-64 md:h-full relative bg-muted">
            <img src="/placeholder.svg?height=800&width=400" alt="Profesor" className="w-full h-full object-cover" />
          </div>

          {/* Curriculum Vitae - lado derecho */}
          <div className="w-full md:w-2/3 p-6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">nombre</DialogTitle>
              <DialogDescription>Profesor de Ciencias Computacionales</DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2">Información Personal</h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Email:</span> juan.perez@universidad.edu
                  </p>
                  <p>
                    <span className="font-medium">Teléfono:</span> (123) 456-7890
                  </p>
                  <p>
                    <span className="font-medium">Oficina:</span> Edificio de Ciencias, Sala 305
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Formación Académica</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Doctorado en Ciencias Computacionales</p>
                    <p>Universidad Nacional, 2010-2014</p>
                  </div>
                  <div>
                    <p className="font-medium">Maestría en Inteligencia Artificial</p>
                    <p>Universidad Tecnológica, 2008-2010</p>
                  </div>
                  <div>
                    <p className="font-medium">Licenciatura en Ingeniería Informática</p>
                    <p>Universidad Estatal, 2004-2008</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Experiencia Profesional</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Profesor Titular</p>
                    <p>Universidad Actual, 2018-Presente</p>
                    <p className="text-sm text-muted-foreground">
                      Imparte cursos de programación avanzada, inteligencia artificial y análisis de datos.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Profesor Asociado</p>
                    <p>Universidad Tecnológica, 2014-2018</p>
                    <p className="text-sm text-muted-foreground">
                      Impartió cursos de algoritmos y estructuras de datos.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Publicaciones Destacadas</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>"Avances en Algoritmos de Aprendizaje Profundo", Revista de IA, 2022</li>
                  <li>
                    "Optimización de Redes Neuronales para Procesamiento de Lenguaje Natural", Conferencia Internacional
                    de Computación, 2020
                  </li>
                  <li>
                    "Métodos Eficientes para Análisis de Grandes Volúmenes de Datos", Journal of Data Science, 2018
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Áreas de Investigación</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted px-2 py-1 rounded-md text-sm">Inteligencia Artificial</span>
                  <span className="bg-muted px-2 py-1 rounded-md text-sm">Aprendizaje Automático</span>
                  <span className="bg-muted px-2 py-1 rounded-md text-sm">Procesamiento de Lenguaje Natural</span>
                  <span className="bg-muted px-2 py-1 rounded-md text-sm">Visión por Computadora</span>
                  <span className="bg-muted px-2 py-1 rounded-md text-sm">Análisis de Datos</span>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Idiomas</h3>
                <div className="space-y-1">
                  <p>Español (Nativo)</p>
                  <p>Inglés (Avanzado)</p>
                  <p>Francés (Intermedio)</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
