import { format, subDays, subWeeks, subMonths } from "date-fns";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function retryFetch(fn, retries = 3) {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 0) throw err;
        console.warn(`Retrying... Attempts left: ${retries}`);
        await delay(1000);
        return retryFetch(fn, retries - 1);
    }
}

export function getDateRange(interval) {
    const now = new Date();
    let from;

    const num = parseInt(interval);
    const unit = interval.replace(/\d+/g, "");

    switch (unit) {
        case "d":
            from = subDays(now, num);
            break;
        case "w":
            from = subWeeks(now, num);
            break;
        case "m":
            from = subMonths(now, num);
            break;
        default:
            throw new Error("Invalid interval format");
    }

    return {
        from: format(from, "dd-MM-yyyy"),
        to: format(now, "dd-MM-yyyy"),
    };
}
