"use client";

import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Route error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 space-y-4">
            <Alert variant="destructive" className="w-full max-w-lg">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>{error?.message || "An unexpected error occurred. Please try again."}</AlertDescription>
            </Alert>

            <Button onClick={() => reset()} variant="default">
                Try Again
            </Button>
        </div>
    );
}
