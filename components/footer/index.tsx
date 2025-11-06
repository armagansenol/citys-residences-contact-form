import { useTranslations } from "next-intl"
import { Link, type Pathnames } from "@/i18n/routing"

export function Footer() {
  const t = useTranslations("common")
  const footerItems = {
    legal: [
      {
        title: t("kvkRelatedInformation"),
        href: "/pdpl/pdpl-related-information" as Pathnames,
      },
      {
        title: t("explicitConsent"),
        href: "/pdpl/explicit-consent" as Pathnames,
      },
      {
        title: t("commercialElectronicMessage"),
        href: "/pdpl/commercial-electronic-message" as Pathnames,
      },
      {
        title: t("cookiePolicy"),
        href: "/pdpl/cookie-policy" as Pathnames,
      },
    ],
  }

  return (
    <footer className='bg-white text-black font-halenoir relative bottom-0 left-0 right-0 px-4 lg:px-12 z-50'>
      <div className='flex flex-col border-t border-bricky-brick-light'>
        <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-5 py-5'>
          <div className='lg:col-span-9 xl:col-span-8 text-center lg:text-left text-[0.8rem]'>
            <span>{t("copyright")}</span>
          </div>
          <div className='lg:col-span-7 xl:col-span-6 flex flex-col items-center lg:flex-row justify-between gap-5'>
            {footerItems.legal.map((item, i) => (
              <Link
                target='_blank'
                rel='noopener noreferrer'
                key={i}
                href={item.href}
                className='block text-[0.7rem] lg:text-[0.6rem] xl:text-[0.8rem] text-black underline'
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-5 py-5'>
          <span className='block w-full md:w-[70vw] lg:w-[50vw] xl:w-[35vw] text-center lg:text-left text-[0.8rem]'>
            Citys Residences, HAYAT GAYRİMENKUL GELİŞTİRME TURİZM İNŞAAT VE TAAHHÜT A.Ş.&apos;nin tescilli bir
            markasıdır. Markanın tüm kullanım hakları, operasyonel faaliyetleri ve temsiliyeti, ilgili muvafakatname
            kapsamında CITYS GAYRİMENKUL GELİŞTİRME ANONİM ŞİRKETİ tarafından yürütülmektedir.
          </span>
        </div>
      </div>
    </footer>
  )
}
