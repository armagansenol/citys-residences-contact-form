"use client"

import s from "./scale-grid.module.css"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import cn from "clsx"
import { useRef } from "react"

import { Img } from "@/components/utility/img"

export interface ScaleGridProps {
  images: string[]
}

export function ScaleGrid(props: ScaleGridProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline({ paused: true })

      tl.from(".scaleGridWrapper", {
        scale: 0.33,
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        pin: true,
        scrub: true,
        start: "center center",
        end: "bottom+=3000px bottom",
      })
    },
    { scope: ref, revertOnUpdate: true }
  )

  return (
    <div className={cn(s.scaleGrid, "scaleGrid")} ref={ref}>
      <div className={cn(s.scaleGridWrapper, "scaleGridWrapper")}>
        <div className={cn("grid grid-cols-24", s.scaleGridRow)}>
          <div className={cn(s.imgC, "col-span-10")}>
            <Img src={props.images[0]} alt="Scale Grid Image" width={1000} height={1000} className="object-cover" />
          </div>
        </div>
        <div className={cn("grid grid-cols-24", s.scaleGridRow)}>
          <div className={cn(s.imgC, "col-span-8")}>
            <Img src={props.images[1]} alt="Scale Grid Image" width={1000} height={1000} className="object-cover" />
          </div>
          <div className={cn(s.imgC, "col-span-8")}>
            <Img src={props.images[2]} alt="Scale Grid Image" width={1000} height={1000} className="object-cover" />
          </div>
          <div className={cn(s.imgC, "col-span-8")}>
            <Img src={props.images[3]} alt="Scale Grid Image" width={1000} height={1000} className="object-cover" />
          </div>
        </div>
        <div className={cn("grid grid-cols-24", s.scaleGridRow)}>
          <div className={cn(s.imgC, "col-span-10")}>
            <Img src={props.images[4]} alt="Scale Grid Image" width={1000} height={1000} className="object-cover" />
          </div>
          <div className={cn(s.imgC, "col-span-14")}>
            <Img src={props.images[5]} alt="Scale Grid Image" width={1000} height={1000} className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
