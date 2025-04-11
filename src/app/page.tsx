import Link from "next/link";
import {
  Download,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themeToggle";
import { MenuBar } from "@/components/menuBar";
import { Spotlight } from "@/components/ui/Spotlight";
import {DownloadSection} from "@/components/DownloadSection";
import {AboutSection} from "@/components/AboutSection";
import {HeroSection} from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AdvancedFeaturesSection } from "@/components/AdvanceFeatures";
import { CustomizeSection } from "@/components/CustomizeSection";
import FooterSection from "@/components/FooterSection"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Spotlight/>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 pl-8">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-4">
              <div className="ml-7 space-x-2 h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
              <span className="inline-block font-bold">FireflyOS</span>
            </Link>
            
            <div className=" hidden md:flex ">
              <MenuBar />
            </div>
            
          </div>
          <div className="flex flex-1 items-center justify-end space-x-7">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Button asChild variant="outline">
                <Link
                  href="https://github.com/akash1047/firefly"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button asChild>
                <Link href="#download">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
      <HeroSection/>


      {/* Featues Section */}
      <FeaturesSection/>

      {/* About Section */}
        <AboutSection/>

      {/* Advanced features section */}
      <AdvancedFeaturesSection/>

      {/* Customization Banner */}

      <CustomizeSection/>

      {/* Download  */}
        <DownloadSection/>
      </main>

      {/* Footer */}
      <FooterSection/>
    </div>
  );
}
