// components/ProjectCard.tsx
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStatusColor } from "@/lib/utils"

export function ProjectCard({ 
  proyecto, 
  onClick 
}: { 
  proyecto: any, 
  onClick: () => void 
}) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
    >
      <div className="aspect-video relative">
        <Image
          src={proyecto.imagen || "/placeholder.svg"}
          alt={proyecto.titulo}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(proyecto.estado)}>{proyecto.estado}</Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{proyecto.titulo}</CardTitle>
        <CardDescription>{proyecto.descripcionCorta}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{proyecto.descripcion}</p>
        <div className="flex flex-wrap gap-2">
          {proyecto.etiquetas.map((etiqueta: string, i: number) => (
            <Badge key={i} variant="secondary">
              {etiqueta}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}