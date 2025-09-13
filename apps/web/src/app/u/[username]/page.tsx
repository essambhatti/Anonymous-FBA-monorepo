"use client"

import { useState } from "react"
import axios, { type AxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { useCompletion } from "@ai-sdk/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import type * as z from "zod"
import type { ApiResponse } from "@/types/ApiResponse"
import Link from "next/link"
import { useParams } from "next/navigation"
import { messageSchema } from "@/schemas/messageSchema"
import { toast } from "sonner"

const specialChar = "||"

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar)
}

const initialMessageString = "What's your favorite movie?||Do you have any pets?||What's your dream job?"

export default function SendMessage() {
  const params = useParams<{ username: string }>()
  const username = params.username

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  })

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  })

  const messageContent = form.watch("content")

  const handleMessageClick = (message: string) => {
    form.setValue("content", message)
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true)
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      })

      toast(response.data.message)
      form.reset({ ...form.getValues(), content: "" })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message ?? "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSuggestedMessages = async () => {
    try {
      await complete("") // fetch new messages
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 font-sans">
      <div className="container mx-auto py-12 px-6 ">
       <h1 className="mb-8 text-4xl font-bold  text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          Public Profile link
          <div className="mt-2 h-0.5 w-48 bg-gradient-to-r from-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-15 mx-auto">
        <div className="bg-gray-900/50 rounded-2xl shadow-2xl border border-cyan-500/30 shadow-cyan-500/10 p-8 w-full">
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg">Send Anonymous Message to @{username}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here"
                        className="resize-none bg-gray-900 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 rounded-md min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-gray-400" />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                {isLoading ? (
                  <Button
                    disabled
                    className="bg-gradient-to-r from-cyan-600 to-purple-600 opacity-50 text-white px-8 py-3 rounded-md"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || !messageContent}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:hover:shadow-none"
                  >
                    Send It
                  </Button>
                )}
              </div>
            </form>
          </Form>
           </div>
          <div className="space-y-4 my-8 w-full">
            <div className="space-y-2">
              <Button
                onClick={fetchSuggestedMessages}
                className="my-4 bg-gray-700 border border-cyan-500/50 text-cyan-400 hover:bg-gray-600 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                disabled={isSuggestLoading}
              >
                {isSuggestLoading ? "Loading..." : "Suggest Messages"}
              </Button>
              <p className="text-white">Click on any message below to select it.</p>
            </div>

            <Card className="bg-gray-800 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 rounded-xl">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">Messages</h3>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                {error ? (
                  <p className="text-[#ff2b6d] drop-shadow-[0_0_5px_rgba(255,43,109,0.5)]">{error.message}</p>
                ) : (
                  parseStringMessages(completion).map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="mb-2 bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300 text-left justify-start"
                      onClick={() => handleMessageClick(message)}
                    >
                      {message}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
            </div>
          <Separator className="my-6 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent h-px" />

          <div className="text-center">
            <div className="mb-4 text-white text-lg drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]">
              Get Your Message Board
            </div>
            <Link href={"/sign-up"}>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Create Your Account
              </Button>
            </Link>
          </div>
      
      </div>
    </div>
  )
}
