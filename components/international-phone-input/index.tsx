import * as React from "react"
import { FormMessage } from "../ui/form"
import { Select, SelectItem, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import { FormControl, FormItem } from "../ui/form"
import { UseFormReturn } from "react-hook-form"
import { defaultCountries } from "react-international-phone"
import { usePhoneInput } from "react-international-phone"
import { FormField } from "../ui/form"
import { Input } from "../ui/input"

export interface InternationalPhoneInputProps {
  form: UseFormReturn<any>
}

export function InternationalPhoneInputComponent({ form }: InternationalPhoneInputProps) {
  const { country, setCountry, phone, handlePhoneValueChange } = usePhoneInput({
    countries: defaultCountries,
    defaultCountry: "tr",
    disableDialCodePrefill: true,
    // disableCountryGuess: true,
    // disableDialCodeAndPrefix: true,
    onChange: ({ phone, country }) => {
      console.log("phone", phone)
      console.log("country", country)
      //   form?.setValue("countryCode", country.dialCode)
      //   form?.setValue("phone", phone)
    },
  })

  return (
    <div className="grid grid-cols-12 gap-2 items-start col-span-1">
      <FormField
        control={form.control}
        name="countryCode"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormControl>
              <Select
                onValueChange={(value) => {
                  // Find the country from defaultCountries that matches the selected dial code
                  const selectedCountry = defaultCountries.find((c) => c[2] === value)
                  if (selectedCountry) {
                    setCountry(selectedCountry[1].toLowerCase()) // Use ISO code (lowercase)
                    field.onChange(value) // Update form value with dial code
                  }
                }}
                value={country.dialCode.toString()}
                defaultValue="90"
              >
                <SelectTrigger className="h-10 rounded-md text-neutral-950 cursor-pointer text-base md:text-sm border border-bricky-brick-light">
                  <SelectValue placeholder="Code">+{country.dialCode}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white text-neutral-950 border border-bricky-brick-light rounded-md z-50">
                  <SelectGroup>
                    {defaultCountries.map((c, index) => (
                      <SelectItem
                        key={`${index}-${c[1]}-${c[2]}`} // Adding index for guaranteed uniqueness
                        className="focus:bg-neutral-50 focus:text-neutral-950 cursor-pointer px-4 py-2 font-halenoir text-base md:text-sm"
                        value={c[2].toString()} // Dial code as value
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
        render={({ field }) => (
          <FormItem className="col-span-9">
            <FormControl>
              <Input
                className="h-10 border border-bricky-brick-light rounded-md"
                placeholder={"Telefon Numarası"}
                name="phone"
                onChange={(e) => {
                  handlePhoneValueChange(e)
                  field.onChange(e)
                }}
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
