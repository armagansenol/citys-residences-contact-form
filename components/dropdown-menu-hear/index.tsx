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
  selectedItems?: string[]
  placeholder: string
  options: CheckboxOption[]
  defaultValues?: Record<string, boolean>
  onChange?: (id: string, checked: boolean) => void
  className?: string
}

// Add ref interface
export interface DropdownMenuCheckboxesRef {
  reset: () => void
}

// Constants for repeated styles
const SELECTED_ITEM_STYLES = "border border-bricky-brick text-bricky-brick"
const UNSELECTED_ITEM_STYLES = "border border-neutral-200 text-neutral-950"
const CHECKBOX_SELECTED_STYLES = "bg-bricky-brick"
const CHECKBOX_UNSELECTED_STYLES = "bg-transparent group-hover:opacity-30"

// Convert to forwardRef
export const DropdownMenuCheckboxesHear = forwardRef<DropdownMenuCheckboxesRef, DropdownMenuCheckboxesProps>(
  ({ placeholder, selectedItems = [], options, defaultValues = {}, onChange, className }, ref) => {
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
              {selectedItems.length > 0 ? (
                <span className="w-full relative overflow-hidden gradient-white-to-transparent">
                  <span className="flex gap-1">
                    {selectedItems.map((item, index) => (
                      <span key={index} className="bg-bricky-brick px-2 py-0.5 rounded-sm text-white whitespace-nowrap">
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
        <DropdownMenuContent className={cn(className, "w-[310px] space-y-1 border-bricky-brick-light p-2")}>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              className="w-full cursor-pointer"
              key={option.id}
              checked={selectedItems?.includes(option.label)}
              onCheckedChange={(checked) => handleCheckedChange(option.id, checked)}
              disabled={option.disabled}
              onSelect={(event) => event.preventDefault()}
            >
              <div
                className={`w-full flex items-center justify-start gap-2 px-1.5 py-2.5 rounded-sm transition-all duration-200 cursor-pointer group
                      ${selectedItems?.includes(option.label) ? SELECTED_ITEM_STYLES : UNSELECTED_ITEM_STYLES}`}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-sm relative overflow-hidden transition-all duration-200 border border-bricky-brick-light group-hover:bg-bricky-brick
                     ${selectedItems?.includes(option.label) ? CHECKBOX_SELECTED_STYLES : CHECKBOX_UNSELECTED_STYLES}`}
                >
                  <Check className="w-full h-full absolute top-0 left-0 text-white" />
                </div>
                <span>{option.label}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

DropdownMenuCheckboxesHear.displayName = "DropdownMenuCheckboxesHear"
