"use client"

import { ContactForm } from "@/components/form-contact"
import { LogoHorizontal } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Video } from "@/components/utility/video"
import { useRef } from "react"

export default function Contact() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col-reverse lg:flex-col xl:grid grid-cols-2" ref={wrapperRef}>
      <div className="col-span-1 h-screen flex flex-col">
        <div className="py-4 lg:py-5 px-4 lg:px-8 lg:pb-0">
          <div className="flex items-center justify-between border-b border-bricky-brick-light py-4">
            <div className="w-48 md:w-64">
              <LogoHorizontal />
            </div>
            <div>
              <LocaleSwitcher theme="dark" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 lg:gap-8 px-4 lg:px-8 py-4 lg:py-8 pb-8 lg:pb-20">
          <div className="block lg:hidden col-span-1 -mx-4">
            <Video
              primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-neutral-900 text-lg md:text-xl font-normal font-halenoir max-w-xl">
            Lütfen iletişim bilgilerinizi giriniz. Satış ekibimiz kısa süre içinde sizinle iletişime geçecektir.
          </h1>
          <ContactForm />
        </div>
      </div>
      <div className="hidden lg:block col-span-1 fixed top-0 right-0 w-1/2 h-full">
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
  )
}
