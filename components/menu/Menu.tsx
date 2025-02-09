"use client"

import s from "./menu.module.css"

import cn from "clsx"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import VerticalCutReveal, { VerticalCutRevealRef } from "@/components/animations/vertical-cut-reveal"
import { gsap, useGSAP } from "@/components/gsap"

const navigationItems: Array<{
  title: string
  href: string
}> = [
  { title: "Konutlar", href: "/" },
  { title: "City's Park", href: "/" },
  { title: "City's Club House", href: "/" },
  { title: "Konum", href: "/" },
  { title: "Yeme İçme", href: "/" },
  { title: "Alışveriş", href: "/" },
  { title: "Justwork Campus", href: "/" },
  { title: "Performans Sanatları Merkezi", href: "/" },
  { title: "City's Club Ayrıcalıkları", href: "/" },
]

interface MenuProps {
  open: boolean
}

export default function Menu({ open }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()

  const [animateLinks, setAnimateLinks] = useState(false)

  const animateLinksForwards = () => setAnimateLinks(true)
  // const animateLinksBackwards = () => setAnimateLinks(false)

  useGSAP(
    () => {
      menuTL.current = gsap.timeline({
        paused: true,
        // onReverseComplete: () => {
        //   animateLinksBackwards()
        // },
      })

      menuTL.current?.fromTo(
        ref.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "expo.inOut",
          onEnd: () => {
            animateLinksForwards()
          },
        }
      )
    },

    {
      scope: ref,
    }
  )

  useGSAP(
    () => {
      if (open) {
        menuTL.current?.play()
      } else {
        menuTL.current?.reverse()
      }
    },
    {
      dependencies: [open],
    }
  )

  return (
    <div className={cn(s.frame)} ref={ref}>
      <div className={cn(s.menu, "menu")} onClick={() => animateLinksForwards()}>
        <div className={s.backdrop}></div>
        <nav className={cn(s.nav)}>
          <ul className={cn("flex flex-col flex-wrap items-center dt:items-start justify-center", s.navList)}>
            {navigationItems.map(({ title, href }) => (
              <li className={cn(s.navItem)} key={title}>
                <Link className="cursor-pointer" href={href}>
                  <AnimatedLink animate={animateLinks}>{title}</AnimatedLink>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

const AnimatedLink = ({
  children,
  animate,
  reset,
}: {
  children: React.ReactNode
  animate: boolean
  reset?: boolean
}) => {
  const textRef = useRef<VerticalCutRevealRef>(null)

  useEffect(() => {
    const currentRef = textRef.current

    if (animate) {
      currentRef?.startAnimation()
    } else {
      currentRef?.reset()
    }

    return () => {
      currentRef?.reset()
    }
  }, [animate])

  useEffect(() => {
    if (reset) {
      textRef.current?.reset()
    }
  }, [reset])

  return (
    <VerticalCutReveal
      autoStart={false}
      splitBy="characters"
      staggerDuration={0.005}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 42,
      }}
      ref={textRef}
    >
      {children}
    </VerticalCutReveal>
  )
}
