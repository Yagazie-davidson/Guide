import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const formatCurrency = (value: string) => {
	// Remove non-numeric characters
	const numericValue = value.replace(/\D/g, "");
	// Format as currency
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 0,
	}).format(parseInt(numericValue || "0"));
};
