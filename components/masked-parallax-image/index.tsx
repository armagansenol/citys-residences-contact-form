"use client"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { useRef } from "react"

import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { gsap, ScrollTrigger } from "@/components/gsap"
import { MPImg } from "@/components/mp-img"

export interface MaskedParallaxImageProps {
  horizontalAlignment?: "rtl" | "ltr"
}

export function MaskedParallaxImage({ horizontalAlignment = "ltr" }: MaskedParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  // const textRef = useRef<VerticalCutRevealRef>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        ".gsap-parallax-text",
        {
          yPercent: 600,
        },
        {
          yPercent: 200,
        },
        "s"
      )
      // .fromTo(
      //   ".gsap-parallax-img-c",
      //   {
      //     yPercent: -10,
      //   },
      //   {
      //     yPercent: 10,
      //   },
      //   "s"
      // )
      // .fromTo(
      //   ".gsap-parallax-img",
      //   {
      //     yPercent: -20,
      //   },
      //   {
      //     yPercent: 20,
      //     onStart: () => {
      //       textRef.current?.startAnimation()
      //     },
      //   },
      //   "s"
      // )
      // .from(
      //   ".gsap-parallax-img",
      //   {
      //     opacity: 0,
      //     duration: 0.25,
      //   },
      //   "s"
      // )

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
    <div className="px-10 py-28" ref={ref}>
      <div className={cn("grid grid-cols-24 items-center")}>
        <div
          className={cn(
            "gsap-parallax-text col-span-6",
            horizontalAlignment === "ltr" ? "col-start-1 order-1" : "col-start-[18] order-2"
          )}
        >
          <p>
            <TextRevealOnScroll splitBy="lines">
              Şehrin yoğunluğundan sıyrılıp eve atılan ilk adımdaki huzur cömertçe sunan City’s Residences, yemyeşil
              alanları ve zamana meydan okuyan tasarımıyla sizi dinginliğin tam kalbine taşır.
            </TextRevealOnScroll>
          </p>
        </div>
        <div
          className={cn(
            "aspect-h-10 aspect-w-9 relative overflow-hidden col-span-16 gsap-parallax-img-c",
            horizontalAlignment === "ltr" ? "col-start-9 order-2" : "col-start-1 order-1"
          )}
        >
          {/* <div className="absolute top-0 left-0 right-0 bottom-0 gsap-overlay z-10 bg-bricky-brick"></div>
          <Image
            src="/img/menu.jpg"
            alt="Parallax Image"
            fill
            className="object-cover gsap-parallax-img mix-blend-overlay z-20"
          />
          <Image src="/img/menu.jpg" alt="Parallax Image" fill className="object-cover gsap-parallax-img z-30" /> */}
          <MPImg imgSrc="/img/menu.jpg" />
        </div>
      </div>
    </div>
  )
}
