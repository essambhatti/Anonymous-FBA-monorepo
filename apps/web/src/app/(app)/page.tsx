"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import messages from "@/messages.json"
import Autoplay from "embla-carousel-autoplay"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-30 from-black to-gray-900 font-sans overflow-x-hidden">
      <main>
        <section className="text-center mb-8 md:mb-12  px-4">
          <h1 className="text-3xl md:text-5xl  font-bold text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] text-balance">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-300 text-pretty">
            <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">Anonymous Feedback</span> - Where your
            identity remains a secret.
          </p>
        </section>

        <Carousel
          className="w-full max-w-xs mx-auto my-auto"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-gray-800 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 rounded-2xl">
                    <CardHeader className="text-white font-semibold border-b border-cyan-500/20 pb-3">
                      <span className="border-b-2 border-cyan-400 pb-1 inline-block">{message.title}</span>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-xl font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-gray-800 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300" />
          <CarouselNext className="bg-gray-800 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300" />
        </Carousel>
      </main>

      <footer className="text-center p-4 md:p-6 bg-black border-t border-cyan-500/30 text-gray-400 fixed w-full bottom-0 backdrop-blur-sm">
        <span className="hover:text-cyan-400 transition-colors duration-300">
          © 2025 Anonymous Feedback. All rights reserved.
        </span>
      </footer>
    </div>
  )
}
