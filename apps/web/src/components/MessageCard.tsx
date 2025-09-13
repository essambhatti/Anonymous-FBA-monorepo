"use client"
import axios, { type AxiosError } from "axios"
import dayjs from "dayjs"
import { X } from "lucide-react"
import type { Message } from "@/model/User"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import type { ApiResponse } from "@/types/ApiResponse"
import { toast } from "sonner"

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      toast(response.data.message)
      onMessageDelete(message._id as string)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message ?? "Failed to delete message")
    }
  }

  return (
    <Card className="bg-gray-900 border border-cyan-400/30 rounded-2xl shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-white font-semibold text-lg leading-relaxed text-balance drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
            {message.content}
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-red-400/40 text-red-400 hover:bg-red-500/10 hover:border-red-400 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all duration-300 rounded-md shrink-0"
              >
                <X className="w-4 h-4 drop-shadow-[0_0_4px_rgba(239,68,68,0.6)]" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white font-semibold">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This action cannot be undone. This will permanently delete this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-3">
                <AlertDialogCancel className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:shadow-[0_0_8px_rgba(156,163,175,0.3)] transition-all duration-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0 hover:from-cyan-400 hover:to-purple-500 hover:shadow-[0_0_16px_rgba(34,211,238,0.4)] transition-all duration-300"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm text-gray-400 mt-2 font-mono">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
