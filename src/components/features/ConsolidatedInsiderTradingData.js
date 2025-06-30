"use client";

import { useConsolidatedColumns, useGetInsiderTradingColumns } from "@/lib/columnDefs/InsiderTradingColumnDefs";
import DataTable from "./DataTable";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // ShadCN ToggleGroup
import { useSuspenseQuery } from "@tanstack/react-query";
import { consolidatedInsiderTradingSelect, getInsiderTradingQuery } from "@/queries/insiderTrading.queries";
import React, { Suspense } from "react";
import { DataTableSkeleton } from "../ui/DataTableSkeleton";

function ConsolidatedInsiderTradingData() {
    const interval = ["1d", "3d", "1w", "1m"];
    const [range, setRange] = React.useState("1d");

    const handleRangeChange = (value) => {
        if (!value) return;
        setRange(value);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight"> Consolidated Insider Trading</h2>
                <ToggleGroup variant="outline" type="single" value={range} onValueChange={handleRangeChange}>
                    {interval.map((item) => (
                        <ToggleGroupItem key={item} value={item}>
                            {item}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
            <Suspense fallback={<DataTableSkeleton />}>
                <ConsolidatedInsiderTradingDataTable range={range} />
            </Suspense>
        </div>
    );
}

const ConsolidatedInsiderTradingDataTable = ({ range }) => {
    const columns = useConsolidatedColumns();
    const { data } = useSuspenseQuery(getInsiderTradingQuery(range, consolidatedInsiderTradingSelect));

    return <DataTable data={data} columns={columns} />;
};

export default ConsolidatedInsiderTradingData;
