"use server"

import { getCountries, getAllCitiesOfCountry, ICity, ICountry } from "@countrystatecity/countries"

export async function fetchCountries(): Promise<ICountry[]> {
  try {
    const countries = await getCountries()
    return countries
  } catch (error) {
    console.error("Error fetching countries:", error)
    return []
  }
}

export async function fetchCities(countryCode: string): Promise<ICity[]> {
  try {
    // Ensure countryCode is valid before calling the library
    if (!countryCode || typeof countryCode !== "string") {
      console.warn("Invalid country code provided to fetchCities")
      return []
    }

    // Use the imported function directly
    const cities = await getAllCitiesOfCountry(countryCode)
    return cities
  } catch (error) {
    console.error("Error fetching cities:", error)
    return []
  }
}
