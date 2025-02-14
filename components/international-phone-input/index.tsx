"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { PhoneInput } from "./phone-input"

export interface InternationalPhoneInputProps {
  form: UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function InternationalPhoneInputComponent({ form }: InternationalPhoneInputProps) {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <PhoneInput value={field.value} onChange={(phone) => field.onChange(phone)} phoneInputRef={field.ref} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
