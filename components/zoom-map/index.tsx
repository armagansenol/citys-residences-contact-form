"use client"

import s from "./zoom-map.module.css"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"

import { gsap, ScrollTrigger } from "@/components/gsap"

export function ZoomMap() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true })

      tl.to(
        ".gsap-img",
        {
          scale: 2.5,
        },
        "s"
      )

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        pin: true,
        scrub: true,
        end: "+=2000",
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="w-screen h-screen flex gap-24 items-center justify-center" ref={ref}>
      <div className={cn(s.mapC, "relative rounded-full overflow-hidden z-10")}>
        <Image
          src="/img/map.jpg"
          alt="City's Residences Istanbul"
          className="object-cover gsap-img w-full h-full"
          priority
          quality={100}
          height={8000}
          width={8000}
        />
      </div>
      <div className="max-w-xl">
        <h2 className="text-halenoir text-3xl font-normal leading-relaxed text-black">
          İstanbul&apos;un kalbinde, Kozyatağının prestijli lokasyonunda, şehri ve zamanı kendi ritminize göre yaşama
          fırsatı edinin.
        </h2>
      </div>
    </div>
  )
}
