"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { useRef } from "react"

export function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({ paused: true })

    tl.from(ref.current, {
      autoAlpha: 0,
      delay: 0.5,
    })

    ScrollTrigger.create({
      animation: tl,
      trigger: ref.current,
      onEnter: () => tl.play(),
      markers: false,
    })
  })

  return (
    <div className="w-full h-full" ref={ref}>
      {children}
    </div>
  )
}
