"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { signInSchema } from "@/schemas/signinSchema"
import { signIn } from "next-auth/react"
import { Loader2 } from "lucide-react"

const Page = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    })
    console.log("SignIn Result:", result)

    if (result?.error) {
      console.error(result.error)
      toast("login failed")
      setIsSubmitting(false)
    }

    if (result?.url) {
      toast("login successful with redirect")
      router.replace("/dashboard")
      setIsSubmitting(false)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/50 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <h1 className="text-3xl font-black text-white font-sans tracking-tight">Welcome Back</h1>
              <p className="text-gray-400 font-light">Sign in to Continue</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Email/username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email/Username"
                          {...field}
                          className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-500 rounded-md h-12 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                          className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-500 rounded-md h-12 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="cursor-pointer h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait{" "}
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center font-light">
              <p className="text-gray-400">
                Don`t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300 relative hover:underline decoration-cyan-400 underline-offset-4"
                >
                  Sign Up{" "}
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
