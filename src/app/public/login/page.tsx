"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { LoginUsuarioRequest, ResetUsuarioRequest } from "@/types"
import { login, PasswordReset } from "@/services/usuarioService";


export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    const loginData: LoginUsuarioRequest = { email, password }

    try {
      const result = await login(loginData)
      if (result.success && result.usuario) {
        // Guarda el usuario en localStorage para que LayoutSwitcher lo detecte
        localStorage.setItem("usuario", JSON.stringify(result.usuario))
        window.location.href = '/admin/inicio'
      } else {
        setErrorMessage(result.error || "Correo o contraseña incorrectos.")
      }
    } catch (error) {
      console.error("Error en login:", error)
      setErrorMessage("Ocurrió un error inesperado.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")
    setSuccessMessage("")
    const loginData: ResetUsuarioRequest = { email: resetEmail}
    try {
      const result = await PasswordReset(loginData) // Asegúrate de que `resetPassword` exista en el servicio
      if (result.success) {
        setSuccessMessage("Te hemos enviado un correo con instrucciones para restablecer tu contraseña.")
      } else {
        setErrorMessage(result.error || "No se pudo enviar el correo de recuperación.")
      }
    } catch (error) {
      console.error("Error en addUser:", error);
      throw error;
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Lógica real de registro aquí
    setTimeout(() => {
      setIsSubmitting(false)
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

          {/* Iniciar sesión */}
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
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Recordarme
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                      <strong className="font-bold">¡Ups!</strong>
                      <span className="ml-2">{errorMessage}</span>
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Registro */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear una cuenta</CardTitle>
                <CardDescription>Completa el formulario para registrarte.</CardDescription>
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
                    <Input id="registerEmail" type="email" required disabled={isSubmitting} />
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

          {/* Recuperar contraseña */}
          <TabsContent value="reset">
            <Card>
              <CardHeader>
                <CardTitle>Recuperar contraseña</CardTitle>
                <CardDescription>
                  Ingresa tu correo electrónico para recibir instrucciones.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordReset}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetEmail">Correo electrónico</Label>
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex items-center rounded-md bg-primary/10 p-3 text-sm text-primary">
                    <Mail className="mr-2 h-4 w-4" />
                    Te enviaremos un enlace para restablecer tu contraseña.
                  </div>
                  {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded" role="alert">
                      {successMessage}
                    </div>
                  )}
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
