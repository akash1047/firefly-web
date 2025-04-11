"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Code, Cpu, Settings, Server, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { motion } from "framer-motion"

// Architecture options
const archOptions = [
  { value: "x86_64", label: "x86_64" },
  { value: "arm64", label: "ARM64" },
  { value: "riscv64", label: "RISC-V 64" },
  { value: "mips64", label: "MIPS64" },
  { value: "powerpc64", label: "PowerPC64" },
  { value: "s390x", label: "s390x" },
  { value: "aarch64", label: "AArch64" },
]

const endianOptions = [
  { value: "little", label: "Little Endian" },
  { value: "big", label: "Big Endian" },
]

const wordWidthOptions = [
  { value: "64", label: "64-bit" },
  { value: "32", label: "32-bit" },
  { value: "16", label: "16-bit" },
]

const intWidthOptions = [
  { value: "32", label: "32-bit" },
  { value: "64", label: "64-bit" },
  { value: "16", label: "16-bit" },
]

const osOptions = [
  { value: "none", label: "None (bare metal)" },
  { value: "linux", label: "Linux" },
  { value: "windows", label: "Windows" },
  { value: "macos", label: "macOS" },
  { value: "freebsd", label: "FreeBSD" },
]

const linkerOptions = [
  { value: "ld.lld", label: "LLD (LLVM Linker)" },
  { value: "rust-lld", label: "Rust LLD" },
  { value: "gold", label: "Gold" },
  { value: "ld", label: "GNU ld" },
]

// CPU Flags from lscpu output
const cpuFlags = [
  "fpu",
  "vme",
  "de",
  "pse",
  "tsc",
  "msr",
  "pae",
  "mce",
  "cx8",
  "apic",
  "sep",
  "mtrr",
  "pge",
  "mca",
  "cmov",
  "pat",
  "pse36",
  "clflush",
  "mmx",
  "fxsr",
  "sse",
  "sse2",
  "ht",
  "syscall",
  "nx",
  "mmxext",
  "fxsr_opt",
  "pdpe1gb",
  "rdtscp",
  "lm",
  "constant_tsc",
  "rep_good",
  "nopl",
  "tsc_reliable",
  "nonstop_tsc",
  "cpuid",
  "extd_apicid",
  "pni",
  "pclmulqdq",
  "ssse3",
  "fma",
  "cx16",
  "sse4_1",
  "sse4_2",
  "movbe",
  "popcnt",
  "aes",
  "xsave",
  "avx",
  "f16c",
  "rdrand",
  "hypervisor",
  "lahf_lm",
  "cmp_legacy",
  "svm",
  "cr8_legacy",
  "abm",
  "sse4a",
  "misalignsse",
  "3dnowprefetch",
  "osvw",
  "topoext",
  "perfctr_core",
  "ssbd",
  "ibrs",
  "ibpb",
  "stibp",
  "vmmcall",
  "fsgsbase",
  "bmi1",
  "avx2",
  "smep",
  "bmi2",
  "rdseed",
  "adx",
  "smap",
  "clflushopt",
  "clwb",
  "sha_ni",
  "xsaveopt",
  "xsavec",
  "xgetbv1",
  "clzero",
  "xsaveerptr",
  "arat",
  "npt",
  "nrip_save",
  "tsc_scale",
  "vmcb_clean",
  "flushbyasid",
  "decodeassists",
  "pausefilter",
  "pfthreshold",
  "v_vmsave_vmload",
  "umip",
  "rdpid",
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

type GitHubAsset = {
    name: string
    browser_download_url: string
  }
  
  type GitHubRelease = {
    created_at: string
    tag_name: string
    assets: GitHubAsset[]
  }
  type Config = {
  [key: string]: string | boolean
}

export default function CustomizePage() {
  // Initialize with values from lscpu output
  const [config, setConfig] = useState<Config>({
    "llvm-target": "x86_64-unknown-none",
    "data-layout": "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-i128:128-f80:128-n8:16:32:64-S128",
    arch: "x86_64",
    "target-endian": "little",
    "target-pointer-width": "64",
    "target-c-int-width": "32",
    os: "none",
    executables: true,
    "linker-flavor": "ld.lld",
    linker: "rust-lld",
    "panic-strategy": "abort",
    "disable-redzone": true,
    features: "-mmx,-sse,+soft-float",
    "rustc-abi": "x86-softfloat",
    "cpu-family": "23",
    "cpu-model": "96",
    "cpu-vendor": "AuthenticAMD",
    "cpu-cores": "4",
    "cpu-threads": "8",
  })

  const [jsonString, setJsonString] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showAllFlags, setShowAllFlags] = useState(false)
  const [selectedFlags, setSelectedFlags] = useState([
    "sse",
    "sse2",
    "avx",
    "avx2",
    "fma",
    "aes",
    "pclmulqdq",
    "popcnt",
  ])
  const [latestReleaseUrl, setLatestReleaseUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {
    // Fetch the latest release from GitHub
    const fetchLatestRelease = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://api.github.com/repos/akash1047/firefly/releases")

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const releases: GitHubRelease[] = await response.json()

        if (releases.length === 0) {
          throw new Error("No releases found")
        }

        // Sort releases by created_at date (newest first)
        releases.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())


        const latestRelease = releases[0]

        // Find the .bin asset
        const binAsset = latestRelease.assets.find((asset) => asset.name.endsWith(".bin"))

        if (!binAsset) {
          throw new Error("No .bin file found in the latest release")
        }

        setLatestReleaseUrl(binAsset.browser_download_url)
        setError("")
      } catch (err) {
        console.error("Error fetching release:", err)
        setError(err.message || "Failed to fetch latest release")
        // Fallback to the hardcoded URL
        setLatestReleaseUrl("https://github.com/akash1047/firefly/releases/download/v0.1.0/bootimage-firefly.bin")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestRelease()
  }, [])

  useEffect(() => {
    setJsonString(JSON.stringify(config, null, 2))
  }, [config])

  const updateConfig = (key: keyof typeof config, value: string | boolean) => {
    setConfig((prev) => {
      const newConfig = { ...prev, [key]: value }

      // Update llvm-target based on arch and os
      if (key === "arch" || key === "os") {
        newConfig["llvm-target"] = `${newConfig.arch}-unknown-${newConfig.os}`
      }

      // Update rustc-abi based on arch
      if (key === "arch") {
        if (value === "x86_64") {
          newConfig["rustc-abi"] = "x86-softfloat"
        } else if (value === "arm64" || value === "aarch64") {
          newConfig["rustc-abi"] = "arm-softfloat"
        } else if (value === "riscv64") {
          newConfig["rustc-abi"] = "riscv-softfloat"
        } else {
          newConfig["rustc-abi"] = `${value}-softfloat`
        }
      }

      return newConfig
    })
  }

  const handleArchSelect = (value: string) => {
    setSheetOpen(false)
    updateConfig("arch", value)
  }

  const downloadConfig = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "target.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFlag = (flag:string) => {
    setSelectedFlags((prev) => (prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]))
  }

  const displayedFlags = showAllFlags ? cpuFlags : cpuFlags.slice(0, 12)

  if (isLoading) {
    <div className="text-sm text-muted-foreground mb-4">
      Fetching the latest release...
    </div>
  }
  if (error) {
    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300 text-sm mb-4">
    {error}
  </div>
  }

  return (
    <div className="min-h-screen bg-[#e4e5f1] dark:bg-muted/20">
      <div className="container max-w-6xl py-8 pl-8">
        <motion.div
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Button variant="ghost" asChild className="mb-4 group">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Target Customization
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Configure compilation settings for your target architecture. Customize CPU architecture, endianness, and
              other low-level settings.
            </p>
          </div>
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" onClick={downloadConfig}>
              <Download className="mr-2 h-4 w-4" />
              Download Config
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              <Link href={latestReleaseUrl}>
                <Download className="mr-2 h-4 w-4" />
                Download OS
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Add decorative elements */}
        <motion.div
          className="absolute top-20 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10 opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 8,
            delay: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        if (error) {
            <motion.div
            className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>Error: {error}</p>
            <p className="text-sm mt-1">Using fallback download link.</p>
          </motion.div>
        }
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:col-span-1 space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-orange-500 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-orange-500" />
                    Architecture Settings
                  </CardTitle>
                  <CardDescription>Configure the target CPU architecture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="arch-type">Arch type</Label>
                    <div className="flex gap-2">
                      <Select value={config.arch} onValueChange={(value) => updateConfig("arch", value)}>
                        <SelectTrigger id="arch-type" className="w-full">
                          <SelectValue placeholder="Select architecture" />
                        </SelectTrigger>
                        <SelectContent>
                          {archOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                          <SheetHeader>
                            <SheetTitle>Select Architecture</SheetTitle>
                            <SheetDescription>Choose a CPU architecture for your target</SheetDescription>
                          </SheetHeader>
                          <motion.div
                            className="grid gap-4 py-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {archOptions.map((option, index) => (
                              <motion.div key={option.value} variants={itemVariants} custom={index}>
                                <Button
                                  variant={config.arch === option.value ? "default" : "outline"}
                                  className={
                                    config.arch === option.value
                                      ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                                      : ""
                                  }
                                  onClick={() => handleArchSelect(option.value)}
                                >
                                  {option.label}
                                </Button>
                              </motion.div>
                            ))}
                          </motion.div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endian">Endian</Label>
                    <Select
                      value={config["target-endian"]}
                      onValueChange={(value) => updateConfig("target-endian", value)}
                    >
                      <SelectTrigger id="endian">
                        <SelectValue placeholder="Select endianness" />
                      </SelectTrigger>
                      <SelectContent>
                        {endianOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="word-width">Word width</Label>
                    <Select
                      value={config["target-pointer-width"]}
                      onValueChange={(value) => updateConfig("target-pointer-width", value)}
                    >
                      <SelectTrigger id="word-width">
                        <SelectValue placeholder="Select word width" />
                      </SelectTrigger>
                      <SelectContent>
                        {wordWidthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-amber-500 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-amber-500" />
                    CPU Details
                  </CardTitle>
                  <CardDescription>Based on your system&apos;s CPU information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>CPU Vendor</Label>
                    <div className="p-2 bg-white dark:bg-card border rounded-md">{config["cpu-vendor"]}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>CPU Family</Label>
                      <div className="p-2 bg-white dark:bg-card border rounded-md">{config["cpu-family"]}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>CPU Model</Label>
                      <div className="p-2 bg-white dark:bg-card border rounded-md">{config["cpu-model"]}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cores</Label>
                      <div className="p-2 bg-white dark:bg-card border rounded-md">{config["cpu-cores"]}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Threads</Label>
                      <div className="p-2 bg-white dark:bg-card border rounded-md">{config["cpu-threads"]}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>CPU Flags</Label>
                    <div className="p-3 bg-white dark:bg-card border rounded-md">
                      <div className="flex flex-wrap gap-1">
                        {displayedFlags.map((flag) => (
                          <motion.span
                            key={flag}
                            className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                              selectedFlags.includes(flag)
                                ? "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleFlag(flag)}
                          >
                            {flag}
                          </motion.span>
                        ))}
                      </div>
                      <button
                        className="mt-2 text-xs flex items-center text-amber-600 dark:text-amber-400"
                        onClick={() => setShowAllFlags(!showAllFlags)}
                      >
                        {showAllFlags ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            Show fewer flags
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            Show all flags
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-l-4 border-l-purple-500 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    Additional Settings
                  </CardTitle>
                  <CardDescription>Configure additional target settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="int-width">Integer width</Label>
                    <Select
                      value={config["target-c-int-width"]}
                      onValueChange={(value) => updateConfig("target-c-int-width", value)}
                    >
                      <SelectTrigger id="int-width">
                        <SelectValue placeholder="Select integer width" />
                      </SelectTrigger>
                      <SelectContent>
                        {intWidthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="os">Operating System</Label>
                    <Select value={config.os} onValueChange={(value) => updateConfig("os", value)}>
                      <SelectTrigger id="os">
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                      <SelectContent>
                        {osOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linker">Linker</Label>
                    <Select
                      value={config["linker-flavor"]}
                      onValueChange={(value) => updateConfig("linker-flavor", value)}
                    >
                      <SelectTrigger id="linker">
                        <SelectValue placeholder="Select linker" />
                      </SelectTrigger>
                      <SelectContent>
                        {linkerOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="executables" className="cursor-pointer">
                      Enable executables
                    </Label>
                    <Switch
                      id="executables"
                      checked={config.executables}
                      onCheckedChange={(checked) => updateConfig("executables", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="redzone" className="cursor-pointer">
                      Disable redzone
                    </Label>
                    <Switch
                      id="redzone"
                      checked={config["disable-redzone"]}
                      onCheckedChange={(checked) => updateConfig("disable-redzone", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Tabs defaultValue="json" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="json" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  JSON Configuration
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Target Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="json" className="mt-4">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="flex items-center justify-between">
                      <span>Target JSON Configuration</span>
                      <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-xs">
                        {copied ? "Copied!" : "Copy to clipboard"}
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      This configuration will be used to compile for your target architecture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <motion.div
                      className="relative rounded-md overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <SyntaxHighlighter
                        language="json"
                        style={vscDarkPlus}
                        showLineNumbers={true}
                        customStyle={{
                          margin: 0,
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                        }}
                      >
                        {jsonString}
                      </SyntaxHighlighter>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Target Architecture Preview</CardTitle>
                    <CardDescription>Visual representation of your target architecture</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="bg-white dark:bg-card rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Background decorations */}
                      <motion.div
                        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-500/10 to-yellow-500/10 rounded-full"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 6,
                          delay: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />

                      <motion.div
                        className="w-32 h-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mb-4 shadow-lg relative overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2,
                        }}
                      >
                        <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
                        <Cpu className="h-16 w-16 text-white" />
                      </motion.div>

                      <motion.h3
                        className="text-xl font-bold mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {typeof config.arch === "string" ? config.arch.toUpperCase() : "Unknown Architecture"}

                      </motion.h3>

                      <motion.div
                        className="text-sm text-muted-foreground text-center max-w-md"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          <motion.span
                            className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {config["target-endian"].charAt(0).toUpperCase() + config["target-endian"].slice(1)} Endian
                          </motion.span>
                          <motion.span
                            className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {config["target-pointer-width"]}-bit Word Width
                          </motion.span>
                          <motion.span
                            className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {config["target-c-int-width"]}-bit Integer Width
                          </motion.span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          <motion.span
                            className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {config["cpu-vendor"]}
                          </motion.span>
                          <motion.span
                            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            Family {config["cpu-family"]}
                          </motion.span>
                          <motion.span
                            className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            Model {config["cpu-model"]}
                          </motion.span>
                        </div>

                        <motion.p
                          className="p-3 bg-[#e4e5f1]/50 dark:bg-black/20 rounded-md inline-block"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          Target:{" "}
                          <span className="font-mono text-orange-600 dark:text-orange-400">
                            {config["llvm-target"]}
                          </span>
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-card rounded-lg border shadow-sm">
            <h3 className="text-xl font-bold mb-2">Ready to compile for your custom target?</h3>
            <p className="text-muted-foreground mb-4">
              Download your configuration file and use it with the Firefly OS build system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={downloadConfig}
                  className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Configuration
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 w-full"
                >
                  <Link href={latestReleaseUrl}>
                    <Download className="mr-2 h-4 w-4" />
                    Download OS Image
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="mt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
