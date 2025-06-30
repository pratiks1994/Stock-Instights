import { NextResponse } from "next/server";

import { getMarqueData } from "./marque.service";

export async function GET(request) {
    try {
        const data = await getMarqueData();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
