"use client"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/components/gsap"

export interface MPImgProps {
  imgSrc: string
}

export function MPImg(props: MPImgProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        ref.current,
        {
          yPercent: -5,
        },
        {
          yPercent: 5,
        },
        "s"
      )
        .fromTo(
          ".gsap-parallax-img",
          {
            yPercent: -5,
          },
          {
            yPercent: 5,
          },
          "s"
        )
        .to(
          ".gsap-parallax-img-overlay",
          {
            opacity: 0,
            duration: 0.25,
          },
          "s"
        )

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        // markers: true,
        scrub: true,
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div
      className={cn("gsap-parallax-img-c rounded-lg w-full h-full flex items-center justify-center overflow-hidden")}
      ref={ref}
    >
      <div className="relative w-full h-[120%] gsap-parallax-img">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-50 isolate gsap-parallax-img-overlay">
          <div className="bg-bricky-brick absolute w-full h-full z-10"></div>
          <Image src={props.imgSrc} alt="Parallax Image" fill className="object-cover mix-blend-overlay z-20" />
        </div>
        <Image src={props.imgSrc} alt="Parallax Image" fill className="object-cover z-40" />
      </div>
    </div>
  )
}
