import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const breakpoints = {
  mobile: 800,
  tablet: 1024,
  widescreen: 1700,
}
