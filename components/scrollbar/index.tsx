"use client"

import { useRect } from "hamo"
import { useLenis } from "lenis/react"
import { useEffect, useRef } from "react"
import s from "./scrollbar.module.css"
import { gsap } from "../gsap"

export function Scrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null!)
  const lenis = useLenis()
  const [innerMeasureRef, { height: innerHeight }] = useRect()
  const [thumbMeasureRef, { height: thumbHeight }] = useRect()

  useLenis(
    ({ scroll, limit }) => {
      const progress = scroll / limit

      thumbRef.current.style.transform = `translate3d(0,${progress * (innerHeight ?? 0 - (thumbHeight ?? 0))}px,0)`
    },
    [innerHeight, thumbHeight]
  )

  useEffect(() => {
    let start: null | number = null

    function onPointerMove(e: PointerEvent) {
      if (!start || !lenis) return
      e.preventDefault()

      const scroll = gsap.utils.mapRange(
        start,
        (innerHeight ?? 0) - (thumbHeight ?? 0) - start,
        e.clientY,
        0,
        lenis.limit
      )
      lenis.scrollTo(scroll, { immediate: true })
    }

    function onPointerDown(e: PointerEvent) {
      start = e.offsetY
    }

    function onPointerUp() {
      start = null
    }

    thumbRef.current?.addEventListener("pointerdown", onPointerDown, false)
    window.addEventListener("pointermove", onPointerMove, false)
    window.addEventListener("pointerup", onPointerUp, false)

    return () => {
      thumbRef.current?.removeEventListener("pointerdown", onPointerDown, false)
      window.removeEventListener("pointermove", onPointerMove, false)
      window.removeEventListener("pointerup", onPointerUp, false)
    }
  }, [lenis, innerHeight, thumbHeight])

  return (
    <div className={s.scrollbar}>
      <div ref={innerMeasureRef} className={s.inner}>
        <div
          className={s.thumb}
          ref={(node) => {
            if (!node) return
            thumbRef.current = node
            thumbMeasureRef(node)
          }}
        />
      </div>
    </div>
  )
}
