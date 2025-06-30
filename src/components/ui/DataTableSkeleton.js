import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton({ columns = 6, rows = 10 }) {
    const columnArray = Array.from({ length: columns });
    const rowArray = Array.from({ length: rows });

    return (
        <div className="py-4 gap-3 flex flex-col">
            <Skeleton className="h-8 w-md" />

            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columnArray.map((_, i) => (
                                <TableHead key={`header-${i}`}>
                                    <Skeleton className="h-6 w-full" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rowArray.map((_, rowIndex) => (
                            <TableRow key={`row-${rowIndex}`} className="py-4">
                                {columnArray.map((_, colIndex) => (
                                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                                        <Skeleton className="h-6 w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
