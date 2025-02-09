"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { useRef } from "react"

import VerticalCutReveal, { VerticalCutRevealRef } from "@/components/animations/vertical-cut-reveal"

interface TextRevealOnScrollProps {
  children: React.ReactNode
  staggerDuration?: number
  splitBy?: "words" | "characters" | "lines" | string
  className?: string
}

export function TextRevealOnScroll({ children, staggerDuration = 0.005, className }: TextRevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<VerticalCutRevealRef>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
      trigger: ref.current,
      onEnter: () => textRef.current?.startAnimation(),
      start: "top-=100px bottom",
      markers: false,
    })
  })

  return (
    <span className={className} ref={ref}>
      <VerticalCutReveal
        autoStart={false}
        splitBy="characters"
        staggerDuration={staggerDuration}
        transition={{
          type: "spring",
          stiffness: 190,
          damping: 42,
        }}
        ref={textRef}
      >
        {children}
      </VerticalCutReveal>
    </span>
  )
}
