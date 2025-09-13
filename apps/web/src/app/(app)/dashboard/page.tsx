"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { Message } from "@/model/User"
import type { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { type AxiosError } from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import type { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { toast } from "sonner"
import { MessageCard } from "@/components/MessageCard"

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  })

  const { register, watch, setValue } = form
  const acceptMessages = watch("acceptMessage")

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages")
      setValue("acceptMessage", response.data.isAcceptingMessages ?? false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message ?? "Failed to fetch message settings")
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoading(true)
      setIsSwitchLoading(false)
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages")
        setMessages(response.data.messages || [])
        if (refresh) {
          toast("Showing latest messages")
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast(axiosError.response?.data.message ?? "Failed to fetch messages")
      } finally {
        setIsLoading(false)
        setIsSwitchLoading(false)
      }
    },
    [setIsLoading, setMessages],
  )

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return

    fetchMessages()

    fetchAcceptMessages()
  }, [session, setValue, fetchAcceptMessages, fetchMessages])

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      })
      setValue("acceptMessage", !acceptMessages)
      toast(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message ?? "Failed to update message settings")
    }
  }

  if (!session || !session.user) {
    return <div></div>
  }

  const { username } = session.user as User

  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast("Profile URL has been copied to clipboard.")
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h1 className="mb-8 text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          User Dashboard
          <div className="mt-2 h-0.5 w-48 bg-gradient-to-r from-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        </h1>

        <div className="mb-6 rounded-2xl border border-cyan-500/30 bg-gray-900/50 p-6 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-white">Copy Your Unique Link</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="flex-1 rounded-md border border-cyan-500/50 bg-gray-800/80 px-3 py-2 text-white placeholder-gray-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.4)] focus:outline-none"
            />
            <Button
              onClick={copyToClipboard}
              className="rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 font-medium text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105"
            >
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-cyan-500/30 bg-gray-900/50 p-6 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Switch
              {...register("acceptMessage")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-600"
            />
            <span className="text-white">
              Accept Messages: <span className="text-cyan-400 font-medium">{acceptMessages ? "On" : "Off"}</span>
            </span>
          </div>
        </div>

        <Button
          className="mb-6 rounded-md border border-cyan-500/50 bg-gray-800/80 px-4 py-2 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 hover:bg-gray-700/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-105"
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            fetchMessages(true)
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
          ) : (
            <RefreshCcw className="h-4 w-4 text-cyan-400" />
          )}
          <span className="ml-2">Refresh Messages</span>
        </Button>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard key={message._id as string} message={message} onMessageDelete={handleDeleteMessage} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-cyan-500/30 bg-gray-900/50 p-8 text-center shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-sm">
              <p className="text-lg text-white mb-2">No messages to display</p>
              <p className="text-gray-400">Your messages will appear here once you start receiving feedback.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
