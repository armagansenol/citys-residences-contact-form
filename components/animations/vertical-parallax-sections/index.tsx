"use client"

import s from "./vertical-parallax-sections.module.css"

import { ScrollTrigger, gsap, useGSAP } from "@/components/gsap"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"

interface VerticalParallaxSectionsProps {
  title: string
  description: string
  items: string[]
}

export function VerticalParallaxSections({ title, description, items }: VerticalParallaxSectionsProps) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const sections = gsap.utils.toArray(`.panel`)

      const tl = gsap.timeline({ paused: true })

      const tl1 = gsap.timeline().to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: "none", // <-- IMPORTANT!
      })

      const imageWrappers = gsap.utils.toArray(`.bg-image`) as HTMLElement[]
      const images = gsap.utils.toArray(`.img`) as HTMLElement[]

      const imagesTl = gsap.timeline({ paused: true })

      images.forEach((image, index) => {
        const isFirst = index === 0
        const isLast = index === images.length - 1

        imagesTl.fromTo(
          image,
          {
            yPercent: isFirst ? 0 : -30,
            ease: "none",
          },
          {
            yPercent: isLast ? 0 : 30,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrappers[index],
              scrub: true,
              //   markers: true,
              end: "+=3500",
            },
          }
        )
      })

      tl.add(tl1)

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        pin: true,
        scrub: 1,
        end: "+=3500",
      })

      const maskTL = gsap.timeline({ paused: true })

      maskTL
        .fromTo(
          ".gsap-mask",
          {
            clipPath: "inset(0% 10% 5% 10%)",
          },
          {
            clipPath: "inset(2.5% 0% 0% 0%)",
            ease: "none",
          }
        )
        .fromTo(
          ".gsap-mask",
          {
            clipPath: "inset(2.5% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
          }
        )

      ScrollTrigger.create({
        animation: maskTL,
        trigger: ref.current,
        start: "top bottom",
        markers: false,
        scrub: true,
      })

      const textTL = gsap.timeline({ paused: true })

      textTL.from(".gsap-text", {
        yPercent: -100,
        ease: "expo.inOut",
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
    <div className="relative" ref={ref}>
      <div className={cn(s.wrppr, "wrppr relative")}>
        <div className={cn(s.mask, "gsap-mask overflow-hidden")}>
          <div className={cn(s.frame)}>
            <div className={cn(s.text, "gsap-text-container overflow-hidden")}>
              <div className="gsap-text">{title}</div>
            </div>
            <div className={cn(s.infoCardC, "gsap-info-card-c")}>
              <div className={cn(s.infoCard, "gsap-info-card")}>
                <div className={s.backdrop}></div>
                <p className={s.infoText}>{description}</p>
              </div>
            </div>
          </div>
          {items.map((image, index) => (
            <section key={index} className={cn(s.panel, "panel")}>
              <div className={cn(s.bgImage, "bg-image")}>
                <Image
                  src={image}
                  alt="Citys Residences"
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
    </div>
  )
}
