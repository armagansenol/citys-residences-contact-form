import { getRequestConfig } from "next-intl/server"
import { Locale, routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await (locale === "tr" ? import("../messages/tr.json") : import(`../messages/${locale}.json`))).default,
  }
})
