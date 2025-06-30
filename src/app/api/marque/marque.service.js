import { getNseClient } from "@/lib/nseClient";
import { delay } from "@/lib/utils";

const NSE_BASE = "https://www.nseindia.com";
const NSE_MARQUE_URL = "https://www.nseindia.com/api/NextApi/apiClient?functionName=getMarqueData";
export const getMarqueData = async () => {
    const client = getNseClient();
    await client.get(NSE_BASE);
    await delay(100);
    const response = await client.get(NSE_MARQUE_URL, {
        headers: {
            Referer: NSE_BASE,
        },
    });

    return response.data;
};
