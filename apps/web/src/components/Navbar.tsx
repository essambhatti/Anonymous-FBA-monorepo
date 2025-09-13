"use client"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-cyan-400/30 shadow-[0_1px_20px_rgba(34,211,238,0.15)] p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="font-black text-xl text-white hover:text-cyan-400 transition-colors duration-300"
          style={{
            textShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Anonymous Feedback
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => signOut()}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-105"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                className="cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-105"
                size="sm"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
