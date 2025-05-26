import DateTimeOptions from "@/utils/DateTimeFormat/utilDateTimeFormat"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCreatedAtDate(val: string | Date){
  return new Date(val).toLocaleString('en-GB', DateTimeOptions)
}