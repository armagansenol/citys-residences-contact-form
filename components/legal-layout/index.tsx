import { ReactNode } from "react"

import { Logo } from "@/components/icons"
import { LegalTableOfContents } from "@/components/legal-table-of-contents"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Img } from "@/components/utility/img"
import { Link } from "@/i18n/routing"

export interface LegalLayoutProps {
  children: ReactNode
}

export function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      <div className="px-4 lg:px-12 relative xl:fixed top-0 left-0 w-full bg-white z-10">
        <div className="flex items-center justify-between xl:border-b border-bricky-brick-light py-4 xl:py-3">
          <div className="opacity-0 pointer-events-none">
            <LocaleSwitcher theme="dark" />
          </div>
          <Link href="/" className="w-28 md:w-36">
            <Logo fill="var(--bricky-brick)" />
          </Link>
          <div>
            <LocaleSwitcher theme="dark" />
          </div>
        </div>
      </div>
      <div className="my-[var(--header-height)]">
        <div className="h-96 bg-slate-200 col-span-12 relative">
          <Img className="object-cover object-center" src="/img/hero.jpg" alt="Citys Residences" fill sizes="100vw" />
        </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-8 section-container space-y-12 pt-8 pb-16 min-h-screen">
          <div className="col-span-12 lg:col-span-4">
            <LegalTableOfContents />
          </div>
          <div className="col-span-12 lg:col-span-8 font-primary prose">{children}</div>
        </div>
      </div>
    </>
  )
}
