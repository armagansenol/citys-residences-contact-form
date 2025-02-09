"use client"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

interface ScaleInProps {
  children: React.ReactNode
}

export function ScaleIn({ children }: ScaleInProps) {
  const scaleInRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (ScrollTrigger.isTouch || !scaleInRef.current) {
      return
    }

    const tl = gsap.timeline({
      paused: true,
    })

    tl.from(".gsap-scale-in-inner", {
      scale: 1,
    })

    ScrollTrigger.create({
      animation: tl,
      id: `scale-in`,
      trigger: scaleInRef.current,
      start: "top bottom",
      end: "top top",
      scrub: true,
    })
  })

  return (
    <div ref={scaleInRef} className="gsap-scale-in">
      <div className="gsap-scale-in-inner">{children}</div>
    </div>
  )
}
