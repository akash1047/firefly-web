"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Settings, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CustomizeSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-[#e4e5f1] dark:bg-muted/20 ">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-white dark:bg-card px-3 py-1 text-sm">Customization</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Customize Your Build</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Configure Firefly OS for your specific hardware needs with our advanced target customization tools.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                <Link href="/customize">
                  <Settings className="mr-2 h-5 w-5" />
                  Customize Target
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[300px] rounded-xl overflow-hidden border shadow-lg bg-white dark:bg-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <Cpu className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Target Customization</h3>
                <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                  Arch type, endianness, word width, and more
                </p>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                delay: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
