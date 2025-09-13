"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { verifySchema } from "@/schemas/verifySchema"
import type { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { type AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import type * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

const Page = () => {
  const router = useRouter()
  const params = useParams<{ username: string }>()
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      })
      toast(response.data.message)

      router.replace("/sign-in")
    } catch (error) {
      console.error("Error in signUp of user", error)
      const axiosError = error as AxiosError<ApiResponse>
      const message = axiosError.response?.data.message
      toast("Verification failed")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl"></div>
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.1)]"></div>

          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">Join Anonymous Feedback</h1>
              <p className="text-gray-400 text-sm">Enter the Verification Code</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-white font-medium">Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          {...field}
                          className="bg-gray-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 rounded-md h-12 px-4 text-center text-lg tracking-widest font-mono focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
