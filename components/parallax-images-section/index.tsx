"use client"

import s from "./parallax-images-section.module.css"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { useRef } from "react"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { ResponsiveLetterSpacing } from "@/components/responsive-letter-spacing"

export function ParallaxImagesSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return

      gsap.registerPlugin(ScrollTrigger)

      const textTL = gsap.timeline({ paused: true })
      const frameTL = gsap.timeline({ paused: true })

      frameTL.to(".frame", {
        y: `${1500}px`,
      })

      textTL.from(".gsap-text", {
        yPercent: -100,
        ease: "expo.out",
        duration: 1.5,
      })

      ScrollTrigger.create({
        animation: textTL,
        trigger: ".gsap-text-container",
        start: "center center",
        toggleActions: "play none none reverse",
      })

      ScrollTrigger.create({
        // animation: frameTL,
        trigger: ".frame",
        // start: "top top",
        // scrub: true,
        pin: true,
        pinSpacing: false,
        // markers: true,
      })
    },
    {
      dependencies: [],
      scope: ref,
    }
  )

  return (
    <div className="relative" ref={ref}>
      <div className={cn(s.frame, "frame")}>
        <div className={cn(s.text, "gsap-text-container overflow-hidden")}>
          <div className="gsap-text">
            <ResponsiveLetterSpacing text="DAHA HUZURLU YAŞA" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <MaskedParallaxImage />
        <MaskedParallaxImage horizontalAlignment="rtl" />
        <MaskedParallaxImage />
        <MaskedParallaxImage horizontalAlignment="rtl" />
      </div>
    </div>
  )
}
