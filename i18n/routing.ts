import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/contact": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/pdpl": {
      tr: "/kvkk",
      en: "/pdpl",
    },
    "/pdpl/explicit-consent": {
      tr: "/kvkk/acik-riza-metni",
      en: "/pdpl/explicit-consent",
    },
    "/pdpl/cookie-policy": {
      tr: "/kvkk/cerez-politikasi",
      en: "/pdpl/cookie-policy",
    },
    "/pdpl/commercial-electronic-message": {
      tr: "/kvkk/ticari-elektronik-ileti-aydinlatma-metni",
      en: "/pdpl/commercial-electronic-message",
    },
    "/pdpl/pdpl-related-information": {
      tr: "/kvkk/kvkk-iliskin-aydinlatma-metni",
      en: "/pdpl/pdpl-related-information",
    },
  },
  localePrefix: "as-needed",
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
