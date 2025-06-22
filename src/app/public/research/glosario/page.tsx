"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {terminos} from  "@/constans/data"

export default function GlosarioPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Glosario de Usabilidad</h1>
          <p className="text-muted-foreground max-w-2xl">
            Consulta nuestro glosario de términos relacionados con la usabilidad y experiencia de usuario.
          </p>
        </div>

        <div className="grid gap-4">
          {terminos.map((termino, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{termino.termino}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{termino.descripcion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

