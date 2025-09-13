"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-900 group-[.toaster]:text-white group-[.toaster]:border-cyan-400/30 group-[.toaster]:shadow-lg group-[.toaster]:shadow-cyan-400/10 group-[.toaster]:rounded-xl group-[.toaster]:border group-[.toaster]:backdrop-blur-sm animate-in slide-in-from-top-2 duration-300",
          description: "group-[.toast]:text-gray-300",
          actionButton:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-cyan-500 group-[.toast]:to-purple-500 group-[.toast]:text-white group-[.toast]:border-0 group-[.toast]:shadow-lg group-[.toast]:shadow-cyan-400/25 group-[.toast]:hover:shadow-cyan-400/40 group-[.toast]:transition-all group-[.toast]:duration-300",
          cancelButton:
            "group-[.toast]:bg-gray-800 group-[.toast]:text-gray-300 group-[.toast]:border group-[.toast]:border-gray-600 group-[.toast]:hover:bg-gray-700 group-[.toast]:hover:border-gray-500 group-[.toast]:transition-all group-[.toast]:duration-300",
          closeButton:
            "group-[.toast]:bg-gray-800 group-[.toast]:text-gray-300 group-[.toast]:border group-[.toast]:border-gray-600 group-[.toast]:hover:bg-gray-700 group-[.toast]:hover:border-gray-500 group-[.toast]:transition-all group-[.toast]:duration-300",
          success:
            "group-[.toaster]:border-green-400/50 group-[.toaster]:shadow-green-400/20 group-[.toaster]:bg-gray-900/95",
          error:
            "group-[.toaster]:border-red-400/50 group-[.toaster]:shadow-red-400/20 group-[.toaster]:bg-gray-900/95",
          info: "group-[.toaster]:border-cyan-400/50 group-[.toaster]:shadow-cyan-400/20 group-[.toaster]:bg-gray-900/95",
          warning:
            "group-[.toaster]:border-yellow-400/50 group-[.toaster]:shadow-yellow-400/20 group-[.toaster]:bg-gray-900/95",
        },
      }}
      style={
        {
          "--normal-bg": "#111827",
          "--normal-text": "#ffffff",
          "--normal-border": "rgba(34, 211, 238, 0.3)",
          "--success-bg": "#111827",
          "--success-text": "#ffffff",
          "--success-border": "rgba(34, 197, 94, 0.5)",
          "--error-bg": "#111827",
          "--error-text": "#ffffff",
          "--error-border": "rgba(239, 68, 68, 0.5)",
          "--info-bg": "#111827",
          "--info-text": "#ffffff",
          "--info-border": "rgba(34, 211, 238, 0.5)",
          "--warning-bg": "#111827",
          "--warning-text": "#ffffff",
          "--warning-border": "rgba(251, 191, 36, 0.5)",
        } as React.CSSProperties
      }
      position="top-right"
      expand={true}
      richColors={true}
      closeButton={true}
      {...props}
    />
  )
}

export { Toaster }
