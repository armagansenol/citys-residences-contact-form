"use client"

import s from "./embla.module.scss"

import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import React, { ReactNode, useCallback, useEffect, useState } from "react"
import cn from "clsx"
import { NextButton, PrevButton } from "./buttons"

interface Props {
  children: ReactNode[]
  nextButton?: React.ReactNode
  options?: EmblaOptionsType
  scrollTo?: number | null
  prevButton?: React.ReactNode
  slideSpacing?: number
  btnsClassName?: string
}

const EmblaCarousel = (props: Props) => {
  const { children, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (props.scrollTo === null || props.scrollTo === undefined) return

    scrollTo(props.scrollTo)
  }, [props.scrollTo, scrollTo])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div
      className={s.embla}
      style={
        {
          "--slide-spacing": `${props.slideSpacing}px`,
        } as React.CSSProperties
      }
    >
      <div className={s.emblaViewport} ref={emblaRef}>
        <div className={s.emblaContainer}>
          {children?.map((item, i) => (
            <div className={s.emblaSlide} key={i}>
              <div className={s.emblaSlideContent}>{item}</div>
            </div>
          ))}
        </div>
      </div>
      {children.length > 1 && (
        <>
          <PrevButton className={cn(s.emblaBtn, s.prev)} onClick={scrollPrev} disabled={prevBtnDisabled}>
            {props.prevButton}
          </PrevButton>

          <NextButton className={cn(s.emblaBtn, s.next)} onClick={scrollNext} disabled={nextBtnDisabled}>
            {props.nextButton}
          </NextButton>
        </>
      )}
    </div>
  )
}

export default EmblaCarousel
