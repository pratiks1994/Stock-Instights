import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { cn } from "@/lib/utils";

export function DataTableColumnHeader({ column, title, className }) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8">
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDown />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUp />
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUp />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDown />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeOff />
                        Hide
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
