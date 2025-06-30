import { getNseClient } from "@/lib/nseClient";
import { delay, getDateRange } from "@/lib/utils";

const NSE_BASE = "https://www.nseindia.com";
const NSE_LISTING_URL = `${NSE_BASE}/companies-listing/corporate-filings-insider-trading`;
const NSE_API_URL = `${NSE_BASE}/api/corporates-pit`;

export const getInsiderTradingDataService = async (interval) => {
    const { from, to } = getDateRange(interval);
    const client = getNseClient();
    await client.get(NSE_BASE);
    await client.get(NSE_LISTING_URL);
    await delay(100);
    const response = await client.get(`${NSE_API_URL}?from_date=${from}&to_date=${to}`, {
        headers: {
            Referer: NSE_LISTING_URL,
        },
    });
    return response.data;
};
