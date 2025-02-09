import { AboutData, ContactInfo, Facility, GalleryItem, HomePageData } from "@/types"
import { fetchApi } from ".."
import { Locale } from "@/i18n/routing"

export const apiService = {
  getAboutData: (lang: Locale) => fetchApi<AboutData>(`/about?lang=${lang}`),
  getGalleryData: (page: number) => fetchApi<GalleryItem[]>(`/gallery?page=${page}`),
  getFacilities: (lang: Locale) => fetchApi<Facility[]>(`/facility?lang=${lang}`),
  getHomepageData: (lang: Locale) => fetchApi<HomePageData>(`/home?lang=${lang}`),
  getContactInfo: () => fetchApi<ContactInfo>(`/contact`),
}

export async function getAboutData(lang: Locale): Promise<AboutData> {
  return await apiService.getAboutData(lang)
}

export async function getGalleryData(page: number): Promise<GalleryItem[]> {
  return await apiService.getGalleryData(page)
}

export async function getFacilityData(lang: Locale): Promise<Facility[]> {
  return await apiService.getFacilities(lang)
}

export async function getHomepageData(lang: Locale): Promise<HomePageData> {
  return await apiService.getHomepageData(lang)
}

export async function getContactInfoData(): Promise<ContactInfo> {
  return await apiService.getContactInfo()
}
