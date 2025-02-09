import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    // "/about": {
    //   tr: "/hakkimizda",
    //   en: "/about",
    // },
    // "/gallery": {
    //   tr: "/galeri",
    //   en: "/gallery",
    // },
  },
  localePrefix: "as-needed",
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
