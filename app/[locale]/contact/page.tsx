import { ContactForm } from "@/components/form-contact"
import { LogoHorizontal } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Video } from "@/components/utility/video"

export default function Contact() {
  const video = (
    <Video
      primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  )
  return (
    <div className="flex flex-col-reverse lg:flex-col xl:grid grid-cols-2">
      <div className="col-span-1 h-screen flex flex-col">
        <div className="py-4 xl:py-5 px-4 lg:px-12 pb-0 pt-0 xl:pt-4 relative xl:fixed top-0 left-0 w-full xl:w-1/2 bg-white z-10">
          <div className="flex items-center justify-between xl:border-b border-bricky-brick-light py-4">
            <div className="w-48 md:w-64">
              <LogoHorizontal />
            </div>
            <div>
              <LocaleSwitcher theme="dark" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 lg:gap-8 px-4 lg:px-12 py-0 xl:py-8 pb-8 lg:pb-20 xl:mt-32">
          <div className="block xl:hidden col-span-1 -mx-4 lg:-mx-12 lg:h-[500px]">{video}</div>
          <h1 className="text-neutral-900 text-lg md:text-xl font-normal font-halenoir max-w-xl">
            Lütfen iletişim bilgilerinizi giriniz. Satış ekibimiz kısa süre içinde sizinle iletişime geçecektir.
          </h1>
          <div className="lg:pr-48 xl:pr-0 pb-12 lg:pb-0">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="hidden xl:block col-span-1 fixed top-0 right-0 w-1/2 h-full">{video}</div>
    </div>
  )
}
