"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useEffect, useState, useRef } from "react"

type CardItem = {
  title: string
  description: string
  icon: React.ReactNode
  gradient?: string
}

type Props = {
  items: CardItem[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)

  const [start, setStart] = useState(false)

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        scrollerRef.current?.appendChild(duplicatedItem)
      })

      // Direction
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      )

      // Speed
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      containerRef.current.style.setProperty("--animation-duration", duration)

      setStart(true)
    }
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.title}-${idx}`}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-white px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-card"
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full text-white mb-6",
                  "bg-gradient-to-r",
                  item.gradient || "from-pink-500 to-purple-500"
                )}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
              <p className="text-sm text-center text-muted-foreground">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
