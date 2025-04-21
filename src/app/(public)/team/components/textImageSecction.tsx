import Image from "next/image"

interface TextImageSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export function TextImageSection({
  title = "Título de la sección",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
  imageSrc = "/placeholder.svg?height=600&width=800",
  imageAlt = "Imagen descriptiva",
}: TextImageSectionProps) {
  return (
    <section className="container py-12 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
        {/* Texto - Lado izquierdo */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400 md:text-lg">{description}</p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Saber más
            </button>
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Contactar
            </button>
          </div>
        </div>

        {/* Imagen - Lado derecho */}
        <div className="relative aspect-video overflow-hidden rounded-lg md:aspect-auto md:h-[500px]">
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
        </div>
      </div>
    </section>
  )
}

