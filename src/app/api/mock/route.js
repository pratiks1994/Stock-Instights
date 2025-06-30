import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        return NextResponse.json({ data: "Mock Data" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
