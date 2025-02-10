"use client"

import s from "./wrapper.module.css"

import type { themeNames } from "@/styles/config.mjs"
import cn from "clsx"
import type { LenisOptions } from "lenis"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

import { SmoothScroll } from "@/components/smooth-scroll"

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  lenis?: LenisOptions
  webgl?: boolean | object
}

export function Wrapper({ children, theme = "light", className, lenis, ...props }: WrapperProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [pathname, theme])

  return (
    <>
      <main className={cn(s.main, className)} {...props}>
        {children}
        <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script>
      </main>
      {lenis && <SmoothScroll root />}
    </>
  )
}
