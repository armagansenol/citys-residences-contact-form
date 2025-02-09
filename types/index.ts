import { StaticImageData } from "next/image"

export interface Filter {
  ui: string
  type: string
}

export interface Social {
  icon: string
  ui: string
  url: string
}

export interface TeamMember {
  id?: string
  description: string
  name: string
  media: Media
  role: string
  social: Social[]
}

export interface Company {
  id?: string
  description: string
  logo: Media
  media: Media
  name: string
  social: Social[]
  isExit: boolean
}

export interface CardCompanyDetail {
  company: Company
  title?: string
}

export interface Media {
  type: MediaType
  src: string | StaticImageData
  height?: number
  width?: number
}

export interface News {
  id?: string
  ui: string
  url: string
  date: string
}

export enum MediaType {
  image = "image",
  video = "video",
}

export enum PageTransitionPhase {
  IDLE = "IDLE",
  APPEAR = "APPEAR",
  IN = "IN",
  OUT = "OUT",
}

export enum CursorType {
  default = "default",
  view = "view",
  email = "email",
  magnet = "magnet",
}

interface MenuItem {
  id: string
  title: string
  href: string
}

export interface SideNavigationProps {
  title: string
  items: MenuItem[]
}

export interface FAQItem {
  id: string
  question: string
  reply: string
}

export interface SupportFaqProps {
  id: string
  title: string
  items: FAQItem[]
}

export enum SocialMedia {
  tiktok = "tiktok",
  facebook = "facebook",
  instagram = "instagram",
  x = "x",
  youtube = "youtube",
}

export interface BannerImage {
  src: string
  alt: string
}

export interface MainSliderProps {
  id: number
  duration: number
  image: BannerImage
  title: string
  description: string
  button: { ui: string; url: string } | null
}

export interface Testimonial {
  id: number
  name: string
  company: string
  comment: string
}

export interface Sector {
  id: string
  name: string
}

export interface SupportArticle {
  id: number
  image: {
    src: string
    alt: string
  }
  title: string
  description: string
  url: string
}

export interface SupportSearchParams {
  keyword: string
  lang?: string
}

export interface SupportFAQProps {
  faqItems: FAQItem[]
}

export interface ImgData {
  src: string
  height: number
  width: number
}

export interface AboutSection {
  title?: string
  content: string
  image: ImgData
}

export interface AboutData {
  section1: AboutSection
  section2: AboutSection
  section3: AboutSection
  section4: AboutSection
}

export interface GalleryItem {
  title: string
  image: {
    src: string
    height: number
    width: number
  }
}

export interface Facility {
  title: string
  content: string
  image: ImgData
  order: number
}

interface Section {
  title?: string
  content: string
  image?: ImgData
  image1?: ImgData
  image2?: ImgData
}

export interface CourseFeatures {
  greensTee: string
  fairway: string
  rough: string
  bunker: string
}

export interface HomePageData {
  section1: Section
  section2: Section
  section3: Section
  section4: Section
  courseFeatures: CourseFeatures
  section5: Section
}

export interface ContactInfo {
  address: {
    ui: string
    link: string
  }
  phone: string
  email: string
  instagram: string
}
