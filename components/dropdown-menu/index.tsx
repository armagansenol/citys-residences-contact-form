"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import cn from "clsx"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface CheckboxOption {
  id: string
  label: string
  disabled?: boolean
}

interface DropdownMenuCheckboxesProps {
  title?: string
  triggerText?: string
  options: CheckboxOption[]
  defaultValues?: Record<string, boolean>
  onChange?: (id: string, checked: boolean) => void
  className?: string
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link"
}

export function DropdownMenuCheckboxes({
  triggerText = "Open",
  options,
  defaultValues = {},
  onChange,
  className,
}: DropdownMenuCheckboxesProps) {
  const [checkedStates, setCheckedStates] = useState<Record<string, Checked>>(() => defaultValues)

  const handleCheckedChange = (id: string, checked: Checked) => {
    setCheckedStates((prev) => ({ ...prev, [id]: checked }))
    onChange?.(id, checked as boolean)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-11 w-full border border-bricky-brick-light flex items-center justify-between px-2 lg:px-4 rounded-md text-base md:text-sm outline-none focus:outline-none focus:ring-0"
          type="button"
        >
          <span className="truncate">{triggerText}</span>
          <ChevronDown className="size-4 flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(className, "w-80 lg:w-72 border-bricky-brick-light")}>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            className="cursor-pointer"
            key={option.id}
            checked={checkedStates[option.id] ?? false}
            onCheckedChange={(checked) => handleCheckedChange(option.id, checked)}
            disabled={option.disabled}
            onSelect={(event) => event.preventDefault()}
          >
            <div className="flex items-center justify-stretch gap-2 px-2 py-3 flex-1 hover:bg-accent hover:text-accent-foreground cursor-pointer group">
              <div className="h-4 w-4 rounded-sm border border-neutral-200 relative group-hover:bg-neutral-100 transition-colors duration-200 overflow-hidden">
                <Check
                  className={`h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    ${
                      checkedStates[option.id]
                        ? "opacity-100 text-white bg-neutral-700"
                        : "opacity-0 group-hover:opacity-50 transition-opacity duration-200 text-white bg-neutral-700"
                    } 
                    `}
                />
                <div
                  className={`absolute inset-0 bg-primary 
                  ${checkedStates[option.id] ? "opacity-100" : "opacity-0"} 
                  group-hover:opacity-50 transition-opacity duration-200`}
                />
              </div>
              <span className="flex-1">{option.label}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
