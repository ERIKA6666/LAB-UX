"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/ui/navbar"

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      // Aquí iría la lógica real de inicio de sesión
    }, 1500)
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      // Aquí iría la lógica real de recuperación de contraseña
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      // Aquí iría la lógica real de registro
    }, 1500)
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center py-8">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la página principal
        </Link>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
            <TabsTrigger value="reset">Recuperar</TabsTrigger>
          </TabsList>

          {/* Formulario de Inicio de Sesión */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>Ingresa tus credenciales para acceder a tu cuenta.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@ejemplo.com" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                    </div>
                    <Input id="password" type="password" required disabled={isSubmitting} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Recordarme
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Formulario de Registro */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear una cuenta</CardTitle>
                <CardDescription>Completa el formulario para registrarte en nuestra plataforma.</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" required disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Pérez" required disabled={isSubmitting} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Correo electrónico</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Contraseña</Label>
                    <Input id="registerPassword" type="password" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input id="confirmPassword" type="password" required disabled={isSubmitting} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      Acepto los{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>
                    </Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Registrando..." : "Registrarse"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Formulario de Recuperación de Contraseña */}
          <TabsContent value="reset">
            <Card>
              <CardHeader>
                <CardTitle>Recuperar contraseña</CardTitle>
                <CardDescription>
                  Ingresa tu correo electrónico para recibir instrucciones de recuperación.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordReset}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetEmail">Correo electrónico</Label>
                    <Input id="resetEmail" type="email" placeholder="tu@ejemplo.com" required disabled={isSubmitting} />
                  </div>
                  <div className="flex items-center rounded-md bg-primary/10 p-3 text-sm text-primary">
                    <Mail className="mr-2 h-4 w-4" />
                    Te enviaremos un enlace para restablecer tu contraseña.
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}