"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaHeart } from "react-icons/fa"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface StateVal {
  email: string
  password: string
  errors: string | null
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  // Simple helper to set a cookie from the client (not HttpOnly)
  const setCookie = (name: string, value: string, days?: number) => {
    let cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
    if (days) cookie += `; max-age=${days * 24 * 60 * 60}`;
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') cookie += '; Secure';
    document.cookie = cookie;
  }
  const [state, setState] = useState<StateVal>({
    email: "",
    password: "",
    errors: null,
  })

  const { email, password, errors } = state

  // Handle input changes
  const inputChangeFun = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value, errors: "" })
  }

  // Handle form submit
  const loginSubmitFun = async (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "sakthimsd531@gmail.com" && password === "Sakthimsd531@") {
      setState({ ...state, errors: null }) // clear errors on success
      // Store a simple auth flag in a cookie (client-set, not HttpOnly)
      setCookie('authToken', 'true', 7) // expires in 7 days
      router.push('/admin')

    } else {
      setState({ ...state, errors: "Invalid Email or Password ❌" })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-transparent sm:bg-white border-0 shadow-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Side Image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login_vector.jpg"
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

          {/* Form */}
          <form onSubmit={loginSubmitFun} className="p-6 md:p-8">
            {/* Logo */}
            <div className="flex py-2 justify-center">
              <div className="flex justify-center items-center w-8 h-8 bg-blue-600 text-white text-center font-bold text-lg rounded mr-2">
                <FaHeart />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-xl">MediBook</h2>
                <div className="text-gray-500 text-sm">Clinic</div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Heading */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Sign in to access the admin dashboard
                </p>
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={inputChangeFun}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-blue-50"
                  required
                  value={email}
                />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={inputChangeFun}
                  required
                />
              </div>

              {/* Error Message */}
              {errors && <div className="my-3 text-red-500">{errors}</div>}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}
