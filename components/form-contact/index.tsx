"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Control, useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { countryPhoneCodes } from "@/lib/constants"
import AnimatedButton from "../animated-button"

// interface FormContactProps {
//   translations: FormTranslations
// }

const getFormSchema = () =>
  // translations: FormTranslations
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
    surname: z.string().min(1, { message: "Surname is required" }),
    countryCode: z.string().min(1, { message: "Country code is required" }),
    phone: z
      .string()
      .min(1, { message: "Phone is required" })
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" })
      .refine((val) => /^\+?[0-9]+$/.test(val), { message: "Phone number must contain only numbers" }),
    email: z.string().email({ message: "Email is required" }),
    residenceType: z
      .enum(["x", "y", "z"], {
        required_error: "Residence type is required",
      })
      .nullable(),
    howDidYouHearAboutUs: z
      .enum(["x", "y", "z"], {
        required_error: "How did you hear about us is required",
      })
      .nullable(),
    message: z.string().min(1, { message: "Message is required" }),
    consent: z.boolean().refine((data) => data === true, { message: "Consent is required" }),
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
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value?.toString() ?? ""}
            className={`${commonInputStyles} py-4 px-2 border-bricky-brick-light ${className}`}
            inputMode={name === "phone" ? "tel" : undefined}
            pattern={name === "phone" ? "\\+?[0-9]*" : undefined}
            onChange={(e) => {
              const value = e.target.value
              if (name === "phone") {
                // Allow only numbers and '+' sign
                const formattedValue = value.replace(/[^\d+]/g, "")
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

const FormSelect = ({
  name,
  control,
  placeholder,
  options,
}: {
  name: keyof FormValues
  control: Control<FormValues>
  placeholder: string
  options: { value: string; label: string }[]
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Select onValueChange={field.onChange} value={field.value?.toString() || ""}>
            <SelectTrigger className="h-11 text-sm border border-bricky-brick-light rounded-md text-neutral-900 cursor-pointer">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="text-neutral-900">
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    className="focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer"
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export function ContactForm() {
  // { translations }: FormContactProps
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema()),
    defaultValues: {
      name: "",
      surname: "",
      countryCode: "+90",
      phone: "",
      email: "",
      residenceType: null,
      howDidYouHearAboutUs: null,
      message: "",
      consent: false,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          setMessage({ type: "error", text: result.message || "Failed to submit form" })
          throw new Error(result.message || "Failed to submit form")
        }

        setMessage({ type: "success", text: result.message })
        return result
      } catch (error) {
        console.error("Form submission error:", error)
        throw error
      }
    },
    onSuccess: () => {
      form.reset()

      form.clearErrors()

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    },
    onError: () => {
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="font-halenoir space-y-4 lg:space-y-8">
        <div className="flex flex-col lg:grid grid-flow-col gap-4 md:grid-cols-2">
          <FormInput control={form.control} name="name" placeholder={"ADINIZ*"} />
          <FormInput control={form.control} name="surname" placeholder={"SOYADINIZ*"} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-12 gap-2 items-end col-span-1">
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={"+90"}>
                        <SelectTrigger className="h-9 border-b border-bricky-brick-light rounded-none text-neutral-900 cursor-pointer">
                          <SelectValue placeholder={field.value || "ÜLKE KODU"}>{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="text-neutral-900">
                          <SelectGroup>
                            {countryPhoneCodes["tr"].map((country, index) => (
                              <SelectItem
                                key={index}
                                className="focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer"
                                value={country.code}
                              >
                                ({country.code}) {country.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-9">
              <FormInput control={form.control} name="phone" type="tel" placeholder={"TELEFON NUMARANIZ*"} />
            </div>
          </div>
          <FormInput
            control={form.control}
            name="email"
            type="email"
            placeholder={"EMAIL ADRESİNİZ*"}
            className="col-span-1 md:col-span-1"
          />
        </div>
        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="residenceType"
            placeholder="TERCİH EDİLEN KONUT TÜRÜ"
            options={[
              { value: "apple", label: "X" },
              { value: "banana", label: "Y" },
              { value: "blueberry", label: "Z" },
              { value: "grapes", label: "W" },
            ]}
          />
          <FormSelect
            control={form.control}
            name="howDidYouHearAboutUs"
            placeholder="BİZİ NEREDEN DUYDUNUZ?"
            options={[
              { value: "apple", label: "X" },
              { value: "banana", label: "Y" },
              { value: "blueberry", label: "Z" },
              { value: "grapes", label: "W" },
            ]}
          />
        </div>
        <div className="grid grid-flow-col">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-0 pt-2">
                <FormLabel className="text-neutral-900 font-normal pl-4 leading-none">MESAJINIZ</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className={`${commonInputStyles} min-h-[140px] border-none p-4 pt-0 rounded-md border border-bricky-brick-light`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      className="border-neutral-900 data-[state=checked]:bg-neutral-900"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-neutral-900 font-light leading-snug cursor-pointer max-w-[90%]">
                    Bize Ulaşın uygulaması kapsamında paylaşacağım kişisel verilere ilişkin Aydınlatma Metni&apos;ni
                    okudum ve aydınlatma metni kapsamında paylaşacağım kişisel verilere ilişkin Açık Rıza Metni&apos;ni
                    okudum, kabul ediyorum.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button type="submit" disabled={mutation.isPending} className="w-full md:w-auto">
          <AnimatedButton text={mutation.isPending ? "GÖNDERİLİYOR..." : "GÖNDER"} />
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
              message.type === "success" ? "text-green-400" : "text-red"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </Form>
  )
}
