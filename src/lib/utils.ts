import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getItemsPerPage = (options: string[]) => {
  return options.map((option) => {
    return {
      value: option,
      label: `${option} per page`,
    };
  });
};

export function formatDate(date: number): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
