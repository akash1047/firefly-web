"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Download, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type GitHubAsset = {
  name: string
  browser_download_url: string
}

type GitHubRelease = {
  created_at: string
  tag_name: string
  assets: GitHubAsset[]
}

export function DownloadSection() {
  const [latestReleaseUrl, setLatestReleaseUrl] = useState(
    "https://github.com/akash1047/firefly/releases/download/v0.1.0/bootimage-firefly.bin",
  )
  const [releaseVersion, setReleaseVersion] = useState("v0.1.0")
  const [releaseDate, setReleaseDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://api.github.com/repos/akash1047/firefly/releases")

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const releases: GitHubRelease[] = await response.json()
        if (releases.length === 0) throw new Error("No releases found")

        releases.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        const latestRelease = releases[0]
        const binAsset = latestRelease.assets.find((asset) => asset.name.endsWith(".bin"))

        if (!binAsset) throw new Error("No .bin file found in the latest release")

        setLatestReleaseUrl(binAsset.browser_download_url)
        setReleaseVersion(latestRelease?.tag_name ?? "v0.1.0")

        const date = new Date(latestRelease.created_at)
        setReleaseDate(
          date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        )

        setError("")
      } catch (err) {
        console.error("Error fetching release:", err)
  
        const errorMessage = err instanceof Error
          ? err.message
          : "Failed to fetch latest release"
  
        setError(errorMessage)
        setReleaseDate("April 2023")
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchLatestRelease()
  }, [])

  return (
    <section id="download" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-yellow-500/5"></div>

      <motion.div
        className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.div
        className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full opacity-10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 2 }}
      />

      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 relative z-10">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to explore Firefly OS?</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Download the latest version and transform your computing experience today.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-6">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="bg-white dark:bg-card shadow-sm rounded-lg p-4 text-left border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Latest Release: {releaseVersion}</h3>
                    {releaseDate && (
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Released on {releaseDate}
                      </div>
                    )}
                  </div>
                </div>
                {isLoading && (
                  <div className="animate-pulse h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                )}
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                >
                  <Link href={latestReleaseUrl}>
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
                  </Link>
                </Button>
              </motion.div>
            </div>

            <Link
              href="/customize"
              className="text-amber-500 hover:underline underline-offset-2 text-sm text-center"
            >
              Customize Build
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
