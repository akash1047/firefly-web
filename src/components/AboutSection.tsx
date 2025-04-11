"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg  dark:bg-muted px-3 py-1 text-sm">About Firefly OS</div>
            <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Built from scratch in Rust
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Firefly features a custom kernel that boots on bare metal, providing complete control over hardware
              without relying on existing OS frameworks.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-start space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground md:text-xl">
              Unlike traditional OS development in C or Assembly, Rust prevents null pointer dereferences, buffer
              overflows, and data races at compile time, making Firefly more secure and reliable. Its modular
              architecture allows for future expansion while maintaining safety guarantees.
            </p>
            <Button
              asChild
              variant="outline"
              className="hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
            >
              <Link href="#download">Try Firefly Today</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

