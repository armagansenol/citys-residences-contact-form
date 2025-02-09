"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import React, { useRef } from "react"

interface ScaleOutProps {
  children: React.ReactNode
}

export function ScaleOut({ children }: ScaleOutProps) {
  const scaleOutRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (ScrollTrigger.isTouch || !scaleOutRef.current) {
      return
    }

    const scaleOut = scaleOutRef.current

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "none",
      },
    })

    tl.fromTo(
      scaleOut.querySelector(".gsap-scale-out-inner"),
      {
        yPercent: 0,
        opacity: 1,
      },
      {
        yPercent: -50,
        opacity: 0.75,
      }
    )

    ScrollTrigger.create({
      animation: tl,
      id: `scale-out`,
      trigger: scaleOut,
      start: () => `bottom top+=${scaleOut.getBoundingClientRect().height + scaleOut.getBoundingClientRect().top}px`,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
    })
  }, [])

  return (
    <div ref={scaleOutRef} className="gsap-scale-out">
      <div className="gsap-scale-out-inner">{children}</div>
    </div>
  )
}
