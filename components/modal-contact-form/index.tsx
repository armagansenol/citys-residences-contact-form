"use client"

import s from "./modal-contact-form.module.css"

import cn from "clsx"
import { useRef } from "react"

import { ContactForm } from "@/components/form-contact"
import { gsap, useGSAP } from "@/components/gsap"
import { Video } from "@/components/utility/video"

interface ModalContactFormProps {
  open: boolean
}

export default function ModalContactForm({ open }: ModalContactFormProps) {
  const ref = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()

  useGSAP(
    () => {
      menuTL.current = gsap.timeline({
        paused: true,
      })

      menuTL.current?.fromTo(
        ref.current,
        { clipPath: "inset(0% 0% 0% 100%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "expo.inOut",
        }
      )
    },

    {
      scope: ref,
      revertOnUpdate: true,
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
      revertOnUpdate: true,
    }
  )

  return (
    <div className={cn(s.frame)} ref={ref}>
      <div className={cn(s.wrapper, "wrapper")}>
        <div className={cn(s.menu, "menu")}>
          <div className={cn(s.content, "flex items-center justify-center w-full h-full")}>
            <div className={cn(s.box, "rounded-2xl overflow-hidden")}>
              <div className="bg-white grid grid-cols-2 w-full h-full">
                <div className="col-span-1 flex flex-col justify-center">
                  <h1 className="text-bricky-brick text-2xl font-normal font-halenoir max-w-xl">
                    Lütfen iletişim bilgilerinizi giriniz. Satış ekibimiz kısa süre içinde sizinle iletişime geçecektir.
                  </h1>
                  <ContactForm />
                </div>
                <div className="col-span-1 bg-slate-400">
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
          </div>
        </div>
      </div>
    </div>
  )
}
