import "@/styles/globals.css"

import { Locale } from "@/i18n/routing"
import { StyleVariables } from "@/lib/style-variables"
import { colors, themes } from "@/styles/config.mjs"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import localFont from "next/font/local"

import { GSAP } from "@/components/gsap"
import { ReactQueryProvider } from "@/components/react-query-provider"
import { SmoothScroll } from "@/components/smooth-scroll"

import { Lexend_Giga } from "next/font/google"

const lexendGiga = Lexend_Giga({
  subsets: ["latin"],
  variable: "--font-lexend-giga",
  weight: ["400", "500", "600", "700", "800"],
})

const halenoir = localFont({
  src: [
    {
      path: "./fonts/Halenoir/Halenoir-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-halenoir",
})

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: "metadata.default" })

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        { url: "/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <StyleVariables colors={colors} themes={themes} />
      </head>
      <body className={`${halenoir.variable} ${lexendGiga.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
        <GSAP scrollTrigger={true} />
        <SmoothScroll root={true} />
      </body>
    </html>
  )
}
