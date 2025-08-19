"use client"

import { Link, usePathname, type Pathnames } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LegalTableOfContents() {
  const pathname = usePathname()

  const legalRoutes: { title: string; href: Pathnames }[] = [
    {
      title: "KVKK İlişkin Aydınlatma Metni",
      href: "/pdpl/pdpl-related-information" as Pathnames,
    },
    {
      title: "Ticari Elektronik İleti Aydınlatma Metni",
      href: "/pdpl/commercial-electronic-message" as Pathnames,
    },
    {
      title: "Açık Rıza Metni",
      href: "/pdpl/explicit-consent" as Pathnames,
    },
    {
      title: "Çerez Politikası",
      href: "/pdpl/cookie-policy" as Pathnames,
    },
  ]

  return (
    <div className="flex flex-col space-y-2 sticky top-20">
      {legalRoutes.map((route) => {
        const isActive = pathname.includes(route.href)
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "font-primary text-lg py-1 px-2 transition-colors duration-200 cursor-pointer",
              isActive && "text-primary font-bold"
            )}
          >
            {route.title}
          </Link>
        )
      })}
    </div>
  )
}
