import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { Control, UseFormReturn } from "react-hook-form"

interface ConsentCheckboxesProps {
  control: Control<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string
  form: UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function ConsentCheckboxes({ control, className, form }: ConsentCheckboxesProps) {
  const t = useTranslations()

  const consentElectronicMessageValue = form.watch("consentElectronicMessage")
  const consentSmsValue = form.watch("consentSms")
  const consentEmailValue = form.watch("consentEmail")
  const consentPhoneValue = form.watch("consentPhone")

  useEffect(() => {
    if (!consentElectronicMessageValue) {
      form.setValue("consentSms", false)
      form.setValue("consentEmail", false)
      form.setValue("consentPhone", false)
    }
  }, [consentElectronicMessageValue])

  useEffect(() => {
    if (consentSmsValue || consentEmailValue || consentPhoneValue) {
      form.setValue("consentElectronicMessage", true)
      form.setValue("consent", true)
    } else {
      form.setValue("consentElectronicMessage", false)
    }
  }, [consentSmsValue, consentEmailValue, consentPhoneValue])

  useEffect(() => {
    const isFirstCheck = consentElectronicMessageValue && !consentSmsValue && !consentEmailValue && !consentPhoneValue

    if (isFirstCheck) {
      form.setValue("consentSms", true)
      form.setValue("consentEmail", true)
      form.setValue("consentPhone", true)
    }
  }, [consentElectronicMessageValue])

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
