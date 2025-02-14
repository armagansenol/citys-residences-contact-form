"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import cn from "clsx"
import { Check, ChevronDown } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"

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
}

export interface DropdownMenuCheckboxesRef {
  reset: () => void
}

export const DropdownMenuCheckboxesResidences = forwardRef<DropdownMenuCheckboxesRef, DropdownMenuCheckboxesProps>(
  ({ placeholder, selectedItems, options, defaultValues = {}, onChange, className }, ref) => {
    const handleCheckedChange = (id: string, checked: Checked) => {
      onChange?.(id, checked as boolean)
    }

    useImperativeHandle(ref, () => ({
      reset: () => {
        Object.keys(defaultValues).forEach((id) => {
          onChange?.(id, defaultValues[id] ?? false)
        })
      },
    }))

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="h-10 w-full border border-bricky-brick-light flex items-center justify-between px-2 lg:px-4 rounded-md text-base md:text-sm outline-none focus:outline-none focus:ring-0"
            type="button"
            aria-label={`Select ${placeholder}`}
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
              checked={selectedItems?.includes(option.label)}
              onCheckedChange={(checked) => handleCheckedChange(option.id, checked)}
              disabled={option.disabled}
              onSelect={(event) => event.preventDefault()}
            >
              <div
                className={`w-16 flex items-center justify-center gap-2 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer group
                      ${
                        selectedItems?.includes(option.label)
                          ? "border border-bricky-brick text-bricky-brick"
                          : "border border-neutral-200 text-neutral-950"
                      } 
                `}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-sm relative overflow-hidden transition-all duration-200 border border-bricky-brick-light group-hover:bg-bricky-brick
                     ${
                       selectedItems?.includes(option.label)
                         ? "bg-bricky-brick "
                         : "bg-transparent group-hover:opacity-30"
                     } 
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
