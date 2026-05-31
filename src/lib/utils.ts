import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind class names safely, handling conditional classes
// and deduplicating conflicting utility classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
