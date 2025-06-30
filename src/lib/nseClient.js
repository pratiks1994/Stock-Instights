import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export const getNseClient = () => {
    const jar = new CookieJar();
    return wrapper(
        axios.create({
            jar,
            timeout: 10000,
            withCredentials: true,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                Accept: "*/*",
                Connection: "keep-alive",
                DNT: "1",
            },
        })
    );
};
