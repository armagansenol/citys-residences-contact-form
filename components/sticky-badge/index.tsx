"use client"

import s from "./sticky-badge.module.css"

import cn from "clsx"
import { useState } from "react"

import ModalContactForm from "@/components/modal-contact-form"

export function StickyBadge() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={cn(s.stickyBadge, "cursor-pointer")} onClick={() => setOpen((prev) => !prev)}>
        <span className="text-foreground text-xl">{open ? "KAPAT" : "RANDEVU AL"}</span>
      </div>
      <ModalContactForm open={open} />
    </>
  )
}
