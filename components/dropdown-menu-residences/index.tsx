"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import cn from "clsx"
import { Check, ChevronDown } from "lucide-react"
import { forwardRef, useImperativeHandle, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface CheckboxOption {
  id: string
  label: string
  disabled?: boolean
}

interface DropdownMenuCheckboxesProps {
  placeholder: string
  selectedItems?: string[]
  options: CheckboxOption[]
  defaultValues?: Record<string, boolean>
  onChange?: (id: string, checked: boolean) => void
  className?: string
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link"
}

export interface DropdownMenuCheckboxesRef {
  reset: () => void
}

export const DropdownMenuCheckboxesResidences = forwardRef<DropdownMenuCheckboxesRef, DropdownMenuCheckboxesProps>(
  ({ placeholder, selectedItems, options, defaultValues = {}, onChange, className }, ref) => {
    const [checkedStates, setCheckedStates] = useState<Record<string, Checked>>(() => defaultValues)

    const handleCheckedChange = (id: string, checked: Checked) => {
      setCheckedStates((prev) => ({ ...prev, [id]: checked }))
      onChange?.(id, checked as boolean)
    }

    useImperativeHandle(ref, () => ({
      reset: () => {
        setCheckedStates(defaultValues)
        Object.keys(checkedStates).forEach((id) => {
          if (checkedStates[id] !== defaultValues[id]) {
            onChange?.(id, defaultValues[id] ?? false)
          }
        })
      },
    }))

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="h-10 w-full border border-bricky-brick-light flex items-center justify-between px-2 lg:px-3 rounded-md text-base md:text-sm outline-none focus:outline-none focus:ring-0"
            type="button"
          >
            <>
              {selectedItems && selectedItems?.length > 0 ? (
                <span className="w-full relative overflow-hidden gradient-white-to-transparent">
                  <span className="flex gap-1">
                    {selectedItems?.map((item, index) => (
                      <span
                        key={index}
                        className="bg-bricky-brick px-2 py-0.5 rounded-sm text-white tracking-widest whitespace-nowrap"
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                </span>
              ) : (
                <span className="truncate">{placeholder}</span>
              )}
            </>
            <ChevronDown className="size-4 flex-shrink-0 text-bricky-brick" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(className, "w-[160px] border-bricky-brick-light flex flex-wrap gap-1.5 p-3")}
          align="end"
        >
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer"
              key={option.id}
              checked={checkedStates[option.id] ?? false}
              onCheckedChange={(checked) => handleCheckedChange(option.id, checked)}
              disabled={option.disabled}
              onSelect={(event) => event.preventDefault()}
            >
              <div
                className={`w-16 flex items-center justify-center gap-2 py-1 rounded-sm transition-colors duration-200 cursor-pointer group
                      ${
                        checkedStates[option.id]
                          ? "border border-bricky-brick text-bricky-brick"
                          : "border border-neutral-200 text-neutral-950"
                      } 
                `}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-sm relative overflow-hidden transition-all duration-200 border border-bricky-brick-light group-hover:bg-bricky-brick
                     ${checkedStates[option.id] ? "bg-bricky-brick " : "bg-transparent group-hover:opacity-30"} 
                  `}
                >
                  <Check className={`w-full h-full absolute top-0 left-0 text-white`} />
                </div>
                <span className="tracking-widest">{option.label}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

DropdownMenuCheckboxesResidences.displayName = "DropdownMenuCheckboxesResidences"
