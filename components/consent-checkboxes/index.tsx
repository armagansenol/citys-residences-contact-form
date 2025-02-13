import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useTranslations } from "next-intl"
import { Control } from "react-hook-form"

interface ConsentCheckboxesProps {
  control: Control<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string
}

export function ConsentCheckboxes({ control, className }: ConsentCheckboxesProps) {
  const t = useTranslations()

  return (
    <div className={`space-y-5 ${className}`}>
      <FormField
        control={control}
        name="consent"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-row gap-3 space-y-0 group">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="text-[0.8rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                {t.rich("contact.form.inputs.consent.placeholder", {
                  legal1: (chunks) => (
                    <a
                      target="_blank"
                      rel="norefferer noopener"
                      href="/pdf/citys-residences-kvkk-aydinlatma-metni.pdf"
                      className="text-neutral-950 underline font-medium"
                    >
                      {chunks}
                    </a>
                  ),
                  legal2: (chunks) => (
                    <a
                      target="_blank"
                      rel="norefferer noopener"
                      href="/pdf/citys-residences-acik-riza-metni.pdf"
                      className="text-neutral-950 underline font-medium"
                    >
                      {chunks}
                    </a>
                  ),
                  legal3: (chunks) => (
                    <a
                      target="_blank"
                      rel="norefferer noopener"
                      href="/pdf/citys-residences-ticari-elektronik-ileti-aydinlatma-metni.pdf"
                      className="text-neutral-950 underline font-medium"
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
      <div className="space-y-3">
        <FormField
          control={control}
          name="consentElectronicMessage"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-3 space-y-0 group">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-[0.8rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                  {t.rich("contact.form.inputs.consentElectronicMessage.placeholder", {
                    legal4: (chunks) => (
                      <a
                        target="_blank"
                        rel="norefferer noopener"
                        href="/pdf/citys-residences-acik-riza-beyani.pdf"
                        className="text-neutral-950 underline font-medium"
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
        <div className="space-y-2">
          {["consentSms", "consentEmail", "consentPhone"].map((name) => (
            <FormField
              key={name}
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row gap-3 space-y-0 group">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-[0.8rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                      {name === "consentSms" &&
                        t.rich("contact.form.inputs.consentSms.placeholder", {
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
                        })}
                      {name === "consentEmail" &&
                        t.rich("contact.form.inputs.consentEmail.placeholder", {
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
                        })}
                      {name === "consentPhone" &&
                        t.rich("contact.form.inputs.consentPhone.placeholder", {
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
                        })}
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
