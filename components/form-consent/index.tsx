"use client"

import { FormTranslations } from "@/types"
import { UseFormReturn } from "react-hook-form"
import { useTranslations } from "use-intl"

import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface FormConsentProps {
  form: UseFormReturn<any>
  translations: FormTranslations
}

export function FormConsent({ form, translations }: FormConsentProps) {
  const t = useTranslations()

  return (
    <>
      <div>
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-3 space-y-0 group">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-[0.8rem] text-neutral-950 font-light leading-snug cursor-pointer max-w-[90%]">
                  {t.rich(translations.inputs.consent.placeholder, {
                    Clarification: (chunks) => (
                      <a
                        target="_blank"
                        rel="norefferer noopener"
                        href="/pdf/kvkk-aydinlatma-metni.pdf"
                        className="text-neutral-950 underline"
                      >
                        {chunks}
                      </a>
                    ),
                    ExplicitConsent: (chunks) => (
                      <a
                        target="_blank"
                        rel="norefferer noopener"
                        href="/pdf/acik-riza-metni.pdf"
                        className="text-neutral-950 underline"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="consentElectronicMessage"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-3 space-y-0 group">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-[0.8rem] text-neutral-950 font-light leading-snug cursor-pointer max-w-[90%]">
                  {t(translations.inputs.consentElectronicMessage.placeholder)}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="consentSms"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-3 space-y-0 group">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-[0.8rem] text-neutral-950 font-light leading-snug cursor-pointer max-w-[90%]">
                  {t(translations.inputs.consentSms.placeholder)}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="consentEmail"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-3 space-y-0 group">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-[0.8rem] text-neutral-950 font-light leading-snug cursor-pointer max-w-[90%]">
                  {t(translations.inputs.consentEmail.placeholder)}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="consentPhone"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-3 space-y-0 group">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-[0.8rem] text-neutral-950 font-light leading-snug cursor-pointer max-w-[90%]">
                  {t(translations.inputs.consentPhone.placeholder)}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
