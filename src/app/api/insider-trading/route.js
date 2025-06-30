import { NextResponse } from "next/server";
import { getInsiderTradingDataService } from "./insiderTrading.service";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const interval = searchParams.get("range") || "1d";

    try {
        const data = await getInsiderTradingDataService(interval);
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
