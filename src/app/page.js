import ConsolidatedInsiderTradingData from "@/components/features/ConsolidatedInsiderTradingData";
import InsiderTradingData from "@/components/features/InsiderTradingDataTable";
import StockTicker from "@/components/features/StockTicker";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export default function Home() {
    return (
        <div className="@container/main flex flex-1 flex-col gap-4">
            <Suspense fallback={<Skeleton className="h-10 w-full rounded-md" />}>
                <StockTicker />
            </Suspense>
            {/* <div className="flex flex-col gap-4 md:gap-6 bg-muted/50 rounded-xl p-4">
                <InsiderTradingData />
            </div>
            <div className="flex flex-col gap-4 md:gap-6 bg-muted/50 rounded-xl p-4">
                <ConsolidatedInsiderTradingData />
            </div> */}
        </div>
    );
}
