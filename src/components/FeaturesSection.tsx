"use client"

import { Shield, Star, Zap, Code, Lock, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import { HoverEffect } from "./ui/card-hover-effect"

const features = [
  {
    title: "Memory Safety",
    description: "Leverages Rust's ownership model to prevent memory errors without a garbage collector.",
    icon: <Zap className="h-6 w-6" />,
    gradient: "from-pink-500 to-purple-500",
    link: "#",
  },
  {
    title: "Bare Metal Control",
    description: "Custom kernel that boots directly on hardware for complete control without legacy dependencies.",
    icon: <Shield className="h-6 w-6" />,
    gradient: "from-purple-500 to-indigo-500",
    link: "#",
  },
  {
    title: "Modern Architecture",
    description: "Modular design with clean abstractions for hardware interfaces and system services.",
    icon: <Star className="h-6 w-6" />,
    gradient: "from-indigo-500 to-blue-500",
    link: "#",
  },
  {
    title: "Rust-Powered",
    description: "Built entirely in Rust for memory safety, concurrency, and performance.",
    icon: <Code className="h-6 w-6" />,
    gradient: "from-blue-500 to-cyan-500",
    link: "#",
  },
  {
    title: "Security First",
    description: "Security by design with process isolation and permission-based access control.",
    icon: <Lock className="h-6 w-6" />,
    gradient: "from-cyan-500 to-teal-500",
    link: "#",
  },
  {
    title: "Efficient Performance",
    description: "Optimized for modern hardware with minimal overhead and fast boot times.",
    icon: <Cpu className="h-6 w-6" />,
    gradient: "from-teal-500 to-green-500",
    link: "#",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Safe. Efficient. Modern.</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Firefly OS combines Rust&apos;s safety guarantees with bare-metal performance for a new generation of operating
              systems.
            </p>
          </div>
        </motion.div>

        <HoverEffect items={features} />
      </div>
    </section>
  )
}

