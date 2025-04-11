"use client"

import Link from "next/link"
import Image from "next/image"
import { Download, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-sm text-white mb-2"
              >
                Minimal OS in Rust
              </motion.div>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Firefly OS
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                A minimal operating system built from scratch in Rust, designed for safety, efficiency, and modern
                system programming.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                <Link href="#download">
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
              >
                <Link href="#features">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r "></div>
            <Image
              src="/ss.png"
              width={550}
              height={550}
              alt="Firefly OS Screenshot"
              className="rounded-xl shadow-2xl border border-muted object-cover w-full h-full"
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r "
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

