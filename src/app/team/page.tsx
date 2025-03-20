import { Navbar } from "@/components/ui/navbar";

export default function Team() {
    return (
      <main>
        <Navbar/>
        <div className="container mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold">Bienvenido a nuestra página</h1>
          <p className="mt-4">Esta es la página de equipo</p>
        </div>
      </main>
    );
  }