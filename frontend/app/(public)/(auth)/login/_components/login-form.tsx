'use client'
import { Button } from "@/components/ui/button"
import { Loader2, LockIcon, MailIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { FieldGroup } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import { loginFormSchema, type loginFormType } from "@/lib/schemas/Components/Forms/login-form.schema"
import FieldInput from "@/components/common/field-input/field-input"
import { loginUser } from "@/lib/actions/auth/auth.action"
import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"


const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: loginFormType) => {
    setError(null)
    
    startTransition(async () => {
      const result = await loginUser(data)
      
      if (!result.success) {
        setError(result.message)
        return
      }
      router.push('/home')
      router.refresh()
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 flex flex-col gap-4">
      <FieldGroup>
        <FieldInput
          name="email"
          control={form.control}
          type="email"
          placeholder="Ingresa tu correo"
          Icon={MailIcon}
        />
        <FieldInput
          name="password"
          control={form.control}
          type="password"
          placeholder="Ingresa tu contraseña"
          Icon={LockIcon}
        />
      </FieldGroup>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}
      
      <Link className="text-cyan-600 text-right font-semibold" href="/forgot-password">
        ¿Olvidaste tu contraseña?
      </Link>
      
      <Button type="submit" disabled={isPending} className="capitalize">
        {isPending ? <Loader2 className="animate-spin" /> : 'iniciar sesión'}
      </Button>
    </form>
  )
}

export default LoginForm