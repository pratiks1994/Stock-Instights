import { useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import Link from "next/link";
import StockTableActions from "@/components/features/StockTableActions";

export const useGetInsiderTradingColumns = () => {
    return useMemo(
        () => [
            {
                accessorKey: "acqfromDt",
                header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "symbol",
                header: ({ column }) => <DataTableColumnHeader column={column} title="Symbol" />,
                cell: (info) => (
                    <Link href={`https://www.screener.in/company/${info.getValue()}/`} target="_blank">
                        <span className="font-medium">{info.getValue()}</span>{" "}
                    </Link>
                ),
            },
            {
                accessorKey: "company",
                header: "Company",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "acqName",
                header: "Person",
                accessorFn: (row) => row.acqName.slice(0, 15),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "acqMode",
                header: "Mode",
                cell: (info) => info.getValue(),
            },

            {
                accessorKey: "tdpTransactionType",
                header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
                cell: (info) => {
                    const type = info.getValue();
                    const isBuy = type?.toLowerCase() === "buy";
                    const color = isBuy ? "success" : "destructive"; // or use custom classNames if needed
                    return <Badge variant={color}>{type}</Badge>;
                },
            },
            {
                id: "secAcq",
                header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
                accessorKey: "secAcq",
                cell: (info) => `${info.getValue()} `,
            },
            {
                id: "value",
                header: ({ column }) => <DataTableColumnHeader column={column} title="Value" />,
                accessorKey: "secVal",
                cell: (info) => {
                    const value = parseFloat(info.getValue());
                    return value
                        ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 0,
                          }).format(value)
                        : "₹0.00";
                },
            },
            {
                id: "pricePerShare",
                header: ({ column }) => <DataTableColumnHeader column={column} title="Price/Share" />,

                accessorFn: (row) => row.secVal / row.secAcq,
                cell: (info) => {
                    const value = parseFloat(info.getValue());
                    return value
                        ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 0,
                          }).format(value)
                        : "₹0.00";
                },
            },
            {
                id: "actions",
                accessorFn: (row) => row.symbol,
                cell: (info) => <StockTableActions symbol={info.getValue()} />,
            },
        ],
        []
    );
};

export function useConsolidatedColumns() {
    return useMemo(
        () => [
            {
                accessorKey: "symbol",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Symbol
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => (
                    <Link href={`https://www.screener.in/company/${info.getValue()}/`} target="_blank">
                        <span className="font-medium">{info.getValue()}</span>{" "}
                    </Link>
                ),
            },
            {
                accessorKey: "netSecAcq",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Net Quantity
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => `${info.getValue()} shares`,
            },
            {
                accessorKey: "netSecVal",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Net Value
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) =>
                    new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                    }).format(info.getValue()),
            },
            {
                id: "pricePerShare",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Price / Share
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                accessorFn: (row) => {
                    const qty = parseFloat(row.netSecAcq);
                    const val = parseFloat(row.netSecVal);
                    if (!qty) return null;
                    return val / qty;
                },
                cell: (info) => {
                    const value = info.getValue();
                    return value
                        ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                          }).format(value)
                        : "-";
                },
            },
            {
                id: "actions",

                accessorFn: (row) => row.symbol,
                cell: (info) => <StockTableActions symbol={info.getValue()} />,
            },
        ],
        []
    );
}
