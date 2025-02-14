import { ContactForm } from "@/components/form-contact"
import { LogoHorizontal } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Video } from "@/components/utility/video"
import { FormTranslations } from "@/types"
import { useTranslations } from "next-intl"

export default function Contact() {
  const t = useTranslations("contact")

  const formTranslations: FormTranslations = {
    inputs: {
      name: {
        placeholder: t("form.inputs.name.placeholder"),
        errors: { required: t("form.inputs.name.errors.required") },
      },
      surname: {
        placeholder: t("form.inputs.surname.placeholder"),
        errors: { required: t("form.inputs.surname.errors.required") },
      },
      phone: {
        placeholder: t("form.inputs.phone.placeholder"),
        errors: {
          min: t("form.inputs.phone.errors.min"),
          max: t("form.inputs.phone.errors.max"),
          required: t("form.inputs.phone.errors.required"),
        },
      },
      email: {
        placeholder: t("form.inputs.email.placeholder"),
        errors: {
          required: t("form.inputs.email.errors.required"),
          email: t("form.inputs.email.errors.email"),
        },
      },
      residenceType: {
        placeholder: t("form.inputs.residenceType.placeholder"),
        errors: {
          required: t("form.inputs.residenceType.errors.required"),
        },
      },
      howDidYouHearAboutUs: {
        placeholder: t("form.inputs.howDidYouHearAboutUs.placeholder"),
        errors: {
          required: t("form.inputs.howDidYouHearAboutUs.errors.required"),
        },
        options: {
          reference: t("form.inputs.howDidYouHearAboutUs.options.reference"),
          projectVisit: t("form.inputs.howDidYouHearAboutUs.options.projectVisit"),
          internetSocialMedia: t("form.inputs.howDidYouHearAboutUs.options.internetSocialMedia"),
          billboard: t("form.inputs.howDidYouHearAboutUs.options.billboard"),
          newspaperMagazine: t("form.inputs.howDidYouHearAboutUs.options.newspaperMagazine"),
        },
      },
      message: { placeholder: t("form.inputs.message.placeholder") },
      consent: {
        placeholder: t("form.inputs.consent.placeholder"),
        errors: {
          required: t("form.inputs.consent.errors.required"),
        },
      },
      consentElectronicMessage: {
        placeholder: t("form.inputs.consentElectronicMessage.placeholder"),
      },
      consentSms: {
        placeholder: t("form.inputs.consentSms.placeholder"),
      },
      consentEmail: {
        placeholder: t("form.inputs.consentEmail.placeholder"),
      },
      consentPhone: {
        placeholder: t("form.inputs.consentPhone.placeholder"),
      },
    },
    submit: {
      default: t("form.submit.default"),
      sending: t("form.submit.sending"),
    },
    messages: {
      error: t("form.messages.error"),
      success: t("form.messages.success"),
      successDialog: {
        title: t("form.messages.successDialog.title"),
        description: t("form.messages.successDialog.description"),
        button: t("form.messages.successDialog.button"),
      },
    },
  }

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
        <div className="px-4 lg:px-12 relative xl:fixed top-0 left-0 w-full xl:w-1/2 bg-white z-10">
          <div className="flex items-center justify-between xl:border-b border-bricky-brick-light py-4 xl:py-6">
            <div className="w-48 md:w-64">
              <LogoHorizontal />
            </div>
            <div>
              <LocaleSwitcher theme="dark" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-6 lg:gap-8 px-4 lg:px-12 pb-8 lg:pb-20 xl:mt-32">
          <div className="block xl:hidden col-span-1 -mx-4 lg:-mx-12 lg:h-[500px]">{video}</div>
          <h1 className="text-neutral-900 text-sm font-normal font-halenoir max-w-xs">{t("description")}</h1>
          <div className="lg:pr-48 xl:pr-0 pb-12 lg:pb-0">
            <ContactForm translations={formTranslations} />
          </div>
        </div>
      </div>
      <div className="hidden xl:block col-span-1 fixed top-0 right-0 w-1/2 h-full">{video}</div>
    </div>
  )
}
