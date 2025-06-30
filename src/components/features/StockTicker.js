"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMarqueOptions } from "@/queries/marquee/marque.query";
import Link from "next/link";

const autoplayPlugin = AutoScroll({
    speed: 1,
    delay: 0,
    stopOnInteraction: false, // ✅ Do not stop when dragging/clicking
    stopOnMouseEnter: true,
    playOnInit: true,
});
function StockTicker() {
    const { data } = useSuspenseQuery(getMarqueOptions());

    return (
        <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/40 border-b border-border">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                    containScroll: false,
                }}
                plugins={[autoplayPlugin]}
                className="w-full"
            >
                <CarouselContent className="-ml-0 bg-gray-900/60 ">
                    {data.map((stock, index) => (
                        <CarouselItem key={`${stock.symbol}-${index}`} className="pl-0 basis-auto">
                            <Link
                                href={`https://www.screener.in/company/${stock.symbol}`}
                                target="_blank"
                                className="flex items-center px-6 py-2 border-r border-gray-700 min-w-fit"
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Stock Symbol */}
                                    <span className="font-bold text-blue-400 text-lg min-w-fit">{stock.symbol}</span>

                                    {/* Price */}
                                    <span className="font-mono text-white font-semibold min-w-fit">
                                        ${stock.lastTradedPrice.toFixed(2)}
                                    </span>

                                    {/* Change */}
                                    <div
                                        className={`flex items-center space-x-1 min-w-fit ${
                                            stock.change >= 0 ? "text-green-400" : "text-red-400"
                                        }`}
                                    >
                                        {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                        <span className="font-mono text-sm">
                                            {stock.change >= 0 ? "+" : ""}
                                            {stock.change.toFixed(2)}
                                        </span>
                                        <span className="font-mono text-sm">
                                            ({stock.perChange >= 0 ? "+" : ""}
                                            {stock.perChange.toFixed(2)}%)
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default StockTicker;
