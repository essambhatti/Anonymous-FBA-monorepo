"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signupSchema"
import axios, { type AxiosError } from "axios"
import type { ApiResponse } from "@/types/ApiResponse"
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const Page = () => {
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCkeckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(setUsername, 300)
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    const checkUsernameunique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage("")

        try {
          const response = await axios.get(`/api/check_username_unique?username=${username}`)
          // console.log(response);
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsernameunique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data)
      toast(response.data.message)
      router.replace(`/verify/${username}`)
    } catch (error) {
      console.error("Error in signUp of user", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast("Sign up Failed")
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-cyan-500/20 shadow-cyan-500/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 text-balance">Join Anonymous Feedback</h1>
            <p className="text-gray-400 text-balance">Sign up for anonymous adventure</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          debounced(e.target.value)
                        }}
                        className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-500 rounded-md focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300"
                      />
                    </FormControl>
                    {isCkeckingUsername && <Loader2 className="animate-spin text-cyan-400 w-4 h-4" />}
                    <p
                      className={`text-sm ${usernameMessage === "Username is unique" ? "text-cyan-400" : "text-gray-400"}`}
                    >
                      {usernameMessage}
                    </p>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-500 rounded-md focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300"
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
                        className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-500 rounded-md focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already a member?{" "}
              <Link
                href="/sign-in"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300 relative group"
              >
                Sign in
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
