import { useTranslations } from "next-intl"
import Link from "next/link"

export function Footer() {
  const t = useTranslations("common")
  const footerItems = {
    legal: [
      {
        title: t("kvkRelatedInformation"),
        href: "/pdf/citys-residences-kvkk-aydinlatma-metni.pdf",
      },
      {
        title: t("explicitConsent"),
        href: "/pdf/citys-residences-acik-riza-metni.pdf",
      },
      {
        title: t("commercialElectronicMessage"),
        href: "/pdf/citys-residences-ticari-elektronik-ileti-aydinlatma-metni.pdf",
      },
      {
        title: t("cookiePolicy"),
        href: "/pdf/citys-residences-cerez-politikasi.docx",
      },
    ],
  }

  return (
    <footer className="bg-white text-black font-halenoir relative lg:fixed bottom-0 left-0 right-0 px-4 lg:px-12">
      <div className="flex flex-col border-t border-bricky-brick-light">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-5 py-5">
          <div className="lg:col-span-9 xl:col-span-8 text-center lg:text-left text-[0.8rem]">
            <span>{t("copyright")}</span>
          </div>
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-center lg:flex-row justify-between gap-5">
            {footerItems.legal.map((item, i) => (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                href={item.href}
                className="block text-[0.7rem] lg:text-[0.6rem] xl:text-[0.8rem] text-black underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
