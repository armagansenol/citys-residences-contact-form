import { initialScroll } from "@/lib/constants"
import cn from "clsx"
import type { LinkProps as NextLinkProps } from "next/link"
import NextLink from "next/link"
import React, { forwardRef, useMemo } from "react"
import type { UrlObject } from "url"

type Url = string | UrlObject

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
  NextLinkProps & {
    className?: string
    scroll?: boolean
    ariaLabel?: string
    children: React.ReactNode
    href: Url
  }

const Link: React.ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
  { href, children, className, scroll = initialScroll, ariaLabel = "go to page", ...props },
  ref
) => {
  const isProtocol = useMemo(
    () => typeof href === "string" && (href.startsWith("mailto:") || href.startsWith("tel:")),
    [href]
  )
  const isAnchor = useMemo(() => typeof href === "string" && href.startsWith("#"), [href])
  const isExternal = useMemo(() => typeof href === "string" && href.startsWith("http"), [href])

  if (typeof href === "object") {
    return (
      <NextLink
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        className={cn("cursor-pointer", className)}
        scroll={scroll}
        {...props}
      >
        {children}
      </NextLink>
    )
  }

  if (isProtocol || isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        className={cn("cursor-pointer", className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={cn("cursor-pointer", className)}
      passHref={isAnchor}
      scroll={scroll}
      {...props}
    >
      {children}
    </NextLink>
  )
}

const ForwardedLink = forwardRef(Link)

ForwardedLink.displayName = "Link"

export default ForwardedLink
