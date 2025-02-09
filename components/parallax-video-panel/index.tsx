"use client"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { Video } from "@/components/utility/video"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { useRef } from "react"

export function ParallaxVideoPanel() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true })

      tl.to(
        ".gsap-img-c",
        {
          filter: "blur(8px)",
          opacity: 0.3,
        },
        "s"
      )
        .to(
          ".gsap-img",
          {
            scale: 1.1,
          },
          "s"
        )
        .to(
          ".gsap-video-panel-c",
          {
            yPercent: -100,
          },
          "s"
        )
        .to(".gsap-img-c", {
          filter: "blur(16px)",
        })

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        scrub: true,
        pin: true,
        end: "+=3500",
        // markers: true,
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="w-screen h-screen overflow-hidden bg-bricky-brick" ref={ref}>
      <div className="gsap-img-c w-screen h-screen relative inset-0">
        <Image
          src="/img/slides-2/1.jpg"
          alt="Parallax Image"
          fill
          className="gsap-img object-cover gsap-parallax-img z-30"
        />
      </div>
      <div className="gsap-video-panel-c w-screen h-screen flex justify-center items-center">
        <div className="w-9/12 aspect-video overflow-hidden relative z-10 rounded-md">
          <Video
            primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
