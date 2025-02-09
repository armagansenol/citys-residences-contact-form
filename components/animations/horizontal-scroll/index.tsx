"use client"

import { ResponsiveLetterSpacing } from "@/components/responsive-letter-spacing"
import s from "./horizontal-scroll.module.css"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"

export function HorizontalScroll({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: string[]
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const sections = gsap.utils.toArray(`.panel`)

      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none", // <-- IMPORTANT!
        scrollTrigger: {
          trigger: `.${s.container}`,
          pin: true,
          scrub: true,
          end: "+=5000",
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 2,
            ease: "power3.inOut",
          },
        },
      })

      // ScrollTrigger.defaults({ markers: { startColor: "white", endColor: "white" } })

      // const textWrappers = gsap.utils.toArray(`.text`) as HTMLElement[]
      // const texts = gsap.utils.toArray(`.t`) as HTMLElement[]

      const imageWrappers = gsap.utils.toArray(`.bg-image`) as HTMLElement[]
      const images = gsap.utils.toArray(`.img`) as HTMLElement[]

      // Create parallax effect for all images
      images.forEach((image, index) => {
        const isFirst = index === 0
        const isLast = index === images.length - 1

        gsap.fromTo(
          image,
          {
            xPercent: isFirst ? 0 : -30,
            ease: "none",
          },
          {
            xPercent: isLast ? 0 : 30,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrappers[index],
              containerAnimation: scrollTween,
              scrub: true,
            },
          }
        )
      })

      const textTL = gsap.timeline({ paused: true })

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

      const cardTL = gsap.timeline({ paused: true })

      cardTL.from(".gsap-info-card", {
        yPercent: 30,
        opacity: 0,
        ease: "expo.inOut",
        duration: 1.5,
      })

      ScrollTrigger.create({
        animation: cardTL,
        trigger: ".gsap-info-card-c",
        start: "center center",
        toggleActions: "play none none reverse",
      })
    },
    {
      dependencies: [items],
      scope: ref,
    }
  )

  return (
    <div className="overflow-hidden" ref={ref}>
      <div className={s.container}>
        <div className={cn(s.frame)}>
          <div className={cn(s.text, "gsap-text-container overflow-hidden")}>
            <div className="gsap-text">
              <ResponsiveLetterSpacing text={title} />
            </div>
          </div>
          <div className={cn(s.infoCardC, "gsap-info-card-c")}>
            <div className={cn(s.infoCard, "gsap-info-card")}>
              <div className={s.backdrop}></div>
              <p className={s.infoText}>{description}</p>
            </div>
          </div>
        </div>
        {items.map((src, index) => (
          <section key={index} className={cn(s.panel, "panel")}>
            <div className={cn(s.bgImage, "bg-image")}>
              <Image
                src={src}
                alt="Aerial view of City's Residences"
                fill
                className={cn(s.img, "img object-cover")}
                priority
                sizes="100vw"
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
