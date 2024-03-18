import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const vclsx = (...classes: ClassValue[]) => twMerge(clsx(...classes));
