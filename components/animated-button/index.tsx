"use client"

import s from "./animated-button.module.css"

import { gsap } from "@/components/gsap"
import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { ArrowRight } from "lucide-react"
import { useRef, useState } from "react"

interface AnimatedButtonProps {
  text: string
  path?: string
}

function AnimatedButton({ text = "Button Text" }: AnimatedButtonProps) {
  const [hover, setHover] = useState(false)
  const buttonRef = useRef<HTMLSpanElement>(null)
  const buttonTL = useRef<gsap.core.Timeline>()

  useGSAP(
    () => {
      if (!buttonRef.current) return

      buttonTL.current = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: {
          duration: 0.8,
          reverseSpeed: 2.5,
        },
      })

      const ease = "expo.inOut"

      buttonTL.current
        .to(
          ".gsap-text",
          {
            color: "white",
            duration: 0.8,
            ease,
          },
          "s"
        )
        .to(
          ".gsap-bg",
          {
            y: 0,
            duration: 0.8,
            ease,
          },
          "s"
        )
        .from(
          ".gsap-arrow-left",
          {
            xPercent: -200,
            duration: 1.6,
            ease,
          },
          "s"
        )
        .from(
          ".gsap-btn-left",
          {
            xPercent: -100,
            duration: 1.2,
            ease,
          },
          "s"
        )
        .to(
          ".gsap-btn-right",
          {
            xPercent: 100,
            duration: 1.2,
            ease,
          },
          "s"
        )
    },
    {
      scope: buttonRef,
    }
  )

  useGSAP(
    () => {
      if (hover) {
        buttonTL.current?.play()
      } else {
        buttonTL.current?.reverse()
      }
    },
    {
      dependencies: [hover],
    }
  )

  return (
    <span
      className={cn(s.button, "gsap-button flex items-center justify-center cursor-pointer relative overflow-hidden")}
      ref={buttonRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative w-full h-full flex items-center justify-between">
        <span className={cn(s.iconC, "gsap-btn-right flex items-center justify-center flex-shrink-0 z-20 opacity-0")}>
          <ArrowRight className={cn(s.icon, "text-bricky-brick")} />
        </span>
        <span className="gsap-btn-left flex items-center justify-center z-20 relative">
          <span
            className={cn(
              s.iconC,
              "gsap-arrow-left flex items-center justify-center flex-shrink-0 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full"
            )}
          >
            <ArrowRight className={cn(s.icon, "text-white")} />
          </span>
          <span className={cn(s.text, "gsap-text block z-20")}>{text}</span>
        </span>
        <span className={cn(s.iconC, "gsap-btn-right flex items-center justify-center flex-shrink-0 z-20")}>
          <ArrowRight className={cn(s.icon, "text-bricky-brick")} />
        </span>
      </span>
      <span
        className={cn(s.bg, "gsap-bg bg-bricky-brick absolute top-0 left-0 right-0 bottom-0 translate-y-full z-10")}
      ></span>
    </span>
  )
}

export default AnimatedButton
