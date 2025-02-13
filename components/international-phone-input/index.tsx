import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { defaultCountries, usePhoneInput } from "react-international-phone"

export interface InternationalPhoneInputProps {
  form: UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function InternationalPhoneInputComponent({ form }: InternationalPhoneInputProps) {
  const { country, setCountry, phone, handlePhoneValueChange } = usePhoneInput({
    countries: defaultCountries,
    defaultCountry: "tr",
    value: form.getValues("phone"),
    disableDialCodePrefill: true,
    disableCountryGuess: true,
    disableDialCodeAndPrefix: false,
    prefix: "",
    onChange: ({ phone, country }) => {
      form.setValue("phone", phone)
      form.setValue("countryCode", country.dialCode, { shouldValidate: true })
    },
  })

  useEffect(() => {
    form.setValue("countryCode", country.dialCode, { shouldValidate: true })
  }, [])

  return (
    <div className="flex gap-2 col-span-1">
      <FormField
        control={form.control}
        name="countryCode"
        render={({ field }) => (
          <FormItem className="w-20">
            <FormControl>
              <Select
                onValueChange={(value) => {
                  const selectedCountry = defaultCountries.find((c) => c[2] === value)
                  if (selectedCountry) {
                    setCountry(selectedCountry[1].toLowerCase())
                    field.onChange(value)
                    form.trigger(["countryCode", "phone"])
                  }
                }}
                value={field.value || country.dialCode.toString()}
                defaultValue="90"
              >
                <SelectTrigger className="h-10 rounded-md text-neutral-950 cursor-pointer text-base md:text-sm border border-bricky-brick-light">
                  <SelectValue placeholder="Code">+{field.value || country.dialCode}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white text-neutral-950 border border-bricky-brick-light rounded-md z-50">
                  <SelectGroup>
                    {defaultCountries.map((c, index) => (
                      <SelectItem
                        key={`${index}-${c[1]}-${c[2]}`}
                        className="focus:bg-neutral-50 focus:text-neutral-950 cursor-pointer px-4 py-2 font-halenoir text-base md:text-sm"
                        value={c[2].toString()}
                      >
                        {c[0]} (+{c[2]})
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
      <FormField
        name="phone"
        control={form.control}
        render={() => (
          <FormItem className="flex-1">
            <FormControl>
              <Input
                id="phone"
                className="h-10 border border-bricky-brick-light rounded-md"
                placeholder={"Telefon Numarası"}
                name="phone"
                onChange={handlePhoneValueChange}
                type="tel"
                value={phone}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
