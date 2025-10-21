import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PhoneNumberUtil } from "google-libphonenumber"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const breakpoints = {
  mobile: 800,
  tablet: 1024,
  widescreen: 1700,
}

export const getUtmParameter = (param: string) => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param) || ""
  }
  return ""
}

const phoneUtil = PhoneNumberUtil.getInstance()

export const isPhoneValid = (phone: string, countryCode?: string) => {
  try {
    if (countryCode && phone) {
      // If we have country code, create the full phone number for validation
      const fullPhone = countryCode.startsWith("+") ? `${countryCode}${phone}` : `+${countryCode}${phone}`
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(fullPhone))
    }
    // Fallback to original validation if no country code provided
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    console.log("error", error)
    return false
  }
}
