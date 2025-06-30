import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "../ui/button";
import Link from "next/link";

function StockTableActions({ symbol }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
                    <IconDotsVertical />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem asChild>
                    <Link href={`https://www.screener.in/company/${symbol}/`} target="_blank">
                        Screener
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`https://www.nseindia.com/get-quotes/equity?symbol=${symbol}`} target="_blank">
                        NSE
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`https://charting.nseindia.com/?symbol=${symbol}-EQ`} target="_blank">
                        Chart
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem variant="outline">Favorite</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default StockTableActions;
