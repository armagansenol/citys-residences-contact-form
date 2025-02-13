"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useLenis } from "lenis/react"
import { AnimatePresence, motion } from "motion/react"
import { useLocale } from "next-intl"
import { useCallback, useEffect, useRef, useState } from "react"
import { Control, useForm } from "react-hook-form"
import { z } from "zod"

import { AnimatedButton } from "@/components/animated-button"
import { ConsentCheckboxes } from "@/components/consent-checkboxes"
import { DropdownMenuCheckboxesHear } from "@/components/dropdown-menu-hear"
import { DropdownMenuCheckboxesRef, DropdownMenuCheckboxesResidences } from "@/components/dropdown-menu-residences"
import { IconLoading } from "@/components/icons"
import { InternationalPhoneInputComponent } from "@/components/international-phone-input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getUtmParameter, isPhoneValid } from "@/lib/utils"
import { FormTranslations } from "@/types"

const getFormSchema = (translations: FormTranslations) =>
  z.object({
    name: z.string().min(1, { message: translations.inputs.name.errors.required }),
    surname: z.string().min(1, { message: translations.inputs.surname.errors.required }),
    countryCode: z.string().min(1, { message: "Country code is required" }),
    phone: z.string().refine(isPhoneValid, { message: translations.inputs.phone.errors.required }),
    // .min(12, { message: translations.inputs.phone.errors.min })
    // .max(15, { message: translations.inputs.phone.errors.max })
    email: z
      .string()
      .min(1, { message: translations.inputs.email.errors.required })
      .email({ message: translations.inputs.email.errors.email }),
    residenceType: z.string().min(1, { message: translations.inputs.residenceType.errors.required }),
    howDidYouHearAboutUs: z.string().min(1, { message: translations.inputs.howDidYouHearAboutUs.errors.required }),
    message: z.string(),
    consent: z.boolean().refine((data) => data === true, { message: translations.inputs.consent.errors.required }),
    consentElectronicMessage: z.boolean(),
    consentSms: z.boolean(),
    consentEmail: z.boolean(),
    consentPhone: z.boolean(),
  })

type FormValues = z.infer<ReturnType<typeof getFormSchema>>

const commonInputStyles =
  "bg-transparent border-b border-bricky-brick rounded-none px-0 transition-colors duration-300 ease-in-out"

interface FormInputProps {
  name: keyof FormValues
  control: Control<FormValues>
  placeholder: string
  type?: string
  className?: string
}

const FormInput = ({ name, control, placeholder, type = "text", className }: FormInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-neutral-950 font-normal leading-none block text-base md:text-sm">
          {placeholder}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value?.toString() ?? ""}
            className={`${commonInputStyles} h-10 px-4 border border-bricky-brick-light rounded-md ${className}`}
            onChange={(e) => {
              const value = e.target.value
              if (name === "name" || name === "surname") {
                // Allow only letters
                const formattedValue = value.replace(/[^a-zA-Z\s]/g, "")
                field.onChange(formattedValue)
              } else {
                field.onChange(value)
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

// const FormSelect = ({
//   name,
//   control,
//   placeholder,
//   options,
// }: {
//   name: keyof FormValues
//   control: Control<FormValues>
//   placeholder: string
//   options: { value: string; label: string }[]
// }) => (
//   <FormField
//     control={control}
//     name={name}
//     render={({ field }) => (
//       <FormItem>
//         <FormControl>
//           <Select onValueChange={field.onChange} value={field.value?.toString() || ""}>
//             <SelectTrigger className="h-11 text-base md:text-sm border border-bricky-brick-light rounded-md text-neutral-950 cursor-pointer px-2 lg:px-4">
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent className="text-neutral-950">
//               <SelectGroup>
//                 {options.map((option) => (
//                   <SelectItem
//                     key={option.value}
//                     className="focus:bg-neutral-50 focus:text-neutral-950 cursor-pointer"
//                     value={option.value}
//                   >
//                     {option.label}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// )

interface UseFormMessage {
  message: { type: "success" | "error"; text: string } | null
  showMessage: (type: "success" | "error", text: string) => void
  clearMessage: () => void
}

const useFormMessage = (timeout = 5000): UseFormMessage => {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const clearMessage = useCallback(() => setMessage(null), [])

  const showMessage = useCallback(
    (type: "success" | "error", text: string) => {
      setMessage({ type, text })
      setTimeout(clearMessage, timeout)
    },
    [timeout, clearMessage]
  )

  return { message, showMessage, clearMessage }
}

interface FormContactProps {
  translations: FormTranslations
}

export function ContactForm({ translations }: FormContactProps) {
  const { message, showMessage } = useFormMessage()
  const lenis = useLenis()
  const locale = useLocale()

  const residenceTypeDropdownRef = useRef<DropdownMenuCheckboxesRef>(null)
  const howDidYouHearAboutUsDropdownRef = useRef<DropdownMenuCheckboxesRef>(null)

  const resetDropdowns = () => {
    residenceTypeDropdownRef.current?.reset()
    howDidYouHearAboutUsDropdownRef.current?.reset()
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(translations)),
    defaultValues: {
      name: "",
      surname: "",
      countryCode: "",
      phone: "",
      email: "",
      residenceType: "",
      howDidYouHearAboutUs: "",
      message: "",
      consent: false,
      consentElectronicMessage: false,
      consentSms: false,
      consentEmail: false,
      consentPhone: false,
    },
  })

  const consentElectronicMessageValue = form.watch("consentElectronicMessage")
  const consentSmsValue = form.watch("consentSms")
  const consentEmailValue = form.watch("consentEmail")
  const consentPhoneValue = form.watch("consentPhone")
  const residenceTypeValue = form.watch("residenceType")
  const howDidYouHearAboutUsValue = form.watch("howDidYouHearAboutUs")

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      try {
        const formData = new FormData()
        // Convert all form values to FormData
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value?.toString() ?? "")
        })

        // Add current language to formData
        formData.append("language", locale)

        // Add UTM parameters to formData
        formData.append("utm_source", getUtmParameter("utm_source"))
        formData.append("utm_medium", getUtmParameter("utm_medium"))
        formData.append("utm_campaign", getUtmParameter("utm_campaign"))

        // Add complete URL to formData
        formData.append("url", window.location.href)

        const response = await fetch("https://crm.citysresidences.com/api/lead.php", {
          method: "POST",
          body: formData,
        })

        const result: { success: boolean; message: string } = await response.json()

        if (!response.ok) {
          showMessage("error", result.message || "Failed to submit form")
          throw new Error(result.message || "Failed to submit form")
        }

        if (!result.success) {
          showMessage("error", result.message)
          throw new Error(result.message)
        }

        showMessage("success", result.message)
        return result
      } catch (error) {
        console.error("Form submission error:", error)
        throw error
      }
    },
    onSuccess: () => {
      resetDropdowns()
      form.reset()
      form.clearErrors()
    },
    onError: () => {
      // Clear error message after 5 seconds
      setTimeout(() => {
        showMessage("error", "")
      }, 5000)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data)
  }

  useEffect(() => {
    lenis?.resize()
  }, [form.formState, lenis])

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
      form.setValue("consent", false)
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

  const residenceTypeOptions = [
    { id: "1+1", label: "1+1" },
    { id: "2+1", label: "2+1" },
    { id: "3+1", label: "3+1" },
    { id: "4+1", label: "4+1" },
    { id: "5+1", label: "5+1" },
    { id: "6+1", label: "6+1" },
  ]

  const howDidYouHearAboutUsOptions = [
    { id: "reference", label: translations.inputs.howDidYouHearAboutUs.options.reference },
    { id: "projectVisit", label: translations.inputs.howDidYouHearAboutUs.options.projectVisit },
    { id: "internetSocialMedia", label: translations.inputs.howDidYouHearAboutUs.options.internetSocialMedia },
    { id: "billboard", label: translations.inputs.howDidYouHearAboutUs.options.billboard },
    { id: "newspaperMagazine", label: translations.inputs.howDidYouHearAboutUs.options.newspaperMagazine },
  ]

  const handleResidenceType = useCallback(
    (id: string, checked: boolean) => {
      const option = residenceTypeOptions.find((opt) => opt.id === id)
      if (!option) return

      const currentValue = form.getValues("residenceType") || ""
      const currentLabels = currentValue ? currentValue.split(",") : []
      const newLabels = checked
        ? [...currentLabels, option.label].filter(Boolean)
        : currentLabels.filter((label) => label !== option.label)

      form.setValue("residenceType", newLabels.join(","))
    },
    [form, residenceTypeOptions]
  )

  const handleHowDidYouHearAboutUs = useCallback(
    (id: string, checked: boolean) => {
      const option = howDidYouHearAboutUsOptions.find((opt) => opt.id === id)
      if (!option) return

      const currentValue = form.getValues("howDidYouHearAboutUs") || ""
      const currentLabels = currentValue ? currentValue.split(",") : []
      const newLabels = checked
        ? [...currentLabels, option.label].filter(Boolean)
        : currentLabels.filter((label) => label !== option.label)

      form.setValue("howDidYouHearAboutUs", newLabels.join(","))
    },
    [form, howDidYouHearAboutUsOptions]
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="font-halenoir space-y-6 lg:space-y-6">
        <div className="flex flex-col lg:grid grid-flow-col gap-6 lg:gap-4 md:grid-cols-2">
          <FormInput control={form.control} name="name" placeholder={`${translations.inputs.name.placeholder}*`} />
          <FormInput
            control={form.control}
            name="surname"
            placeholder={`${translations.inputs.surname.placeholder}*`}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
          <InternationalPhoneInputComponent form={form} />
          <div className="col-span-1">
            <FormInput
              control={form.control}
              name="email"
              type="email"
              placeholder={`${locale === "tr" ? "E-Posta" : "Email"}*`}
              className="col-span-1 md:col-span-1"
            />
          </div>
        </div>

        <div className="flex flex-col lg:grid grid-cols-2 gap-6 lg:gap-4">
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="residenceType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropdownMenuCheckboxesResidences
                      {...field}
                      placeholder={`${translations.inputs.residenceType.placeholder}*`}
                      selectedItems={residenceTypeValue !== "" ? residenceTypeValue.split(",") : []}
                      options={residenceTypeOptions}
                      onChange={handleResidenceType}
                      ref={residenceTypeDropdownRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="howDidYouHearAboutUs"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropdownMenuCheckboxesHear
                      {...field}
                      placeholder={`${translations.inputs.howDidYouHearAboutUs.placeholder}*`}
                      selectedItems={howDidYouHearAboutUsValue !== "" ? howDidYouHearAboutUsValue.split(",") : []}
                      options={howDidYouHearAboutUsOptions}
                      onChange={handleHowDidYouHearAboutUs}
                      ref={howDidYouHearAboutUsDropdownRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-flow-col">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-1 pt-2">
                <FormLabel className="text-neutral-950 font-normal leading-none block text-base md:text-sm">
                  {translations.inputs.message.placeholder}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className={`${commonInputStyles} min-h-[140px] p-3 rounded-md border border-bricky-brick-light resize-none`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ConsentCheckboxes control={form.control} />

        <button type="submit" disabled={mutation.isPending} className="flex relative">
          <AnimatedButton text={translations.submit.default} />
          {mutation.isPending && (
            <span className="absolute top-1/2 -right-4 -translate-y-1/2 translate-x-full flex items-center justify-center w-6 h-6">
              <IconLoading fill="var(--bricky-brick)" />
            </span>
          )}
        </button>
      </form>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-center py-6 my-4 ${
              message.type === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </Form>
  )
}
