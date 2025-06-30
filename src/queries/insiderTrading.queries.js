import { queryOptions } from "@tanstack/react-query";
import { getInsiderTradingData } from "./insiderTrading.api";

export const consolidatedInsiderTradingSelect = (data) => {
    const map = new Map();

    data.forEach((item) => {
        if (item.acqMode !== "Market Sale" && item.acqMode !== "Market Purchase") return;

        const symbol = item.symbol;
        const type = item.tdpTransactionType;
        const secAcq = parseFloat(item.secAcq || 0);
        const secVal = parseFloat(item.secVal || 0);

        if (!map.has(symbol)) {
            map.set(symbol, {
                symbol,
                netSecAcq: 0,
                netSecVal: 0,
            });
        }

        const record = map.get(symbol);

        if (type === "Buy") {
            record.netSecAcq += secAcq;
            record.netSecVal += secVal;
        } else if (type === "Sell") {
            record.netSecAcq -= secAcq;
            record.netSecVal -= secVal;
        }

        map.set(symbol, record);
    });

    return Array.from(map.values());
};

export const getInsiderTradingQuery = (interval, selectFn) => {
    return queryOptions({
        queryKey: ["insiderTrading", interval],
        queryFn: () => getInsiderTradingData(interval),
        select: ({ data }) => (selectFn ? selectFn(data) : data),
    });
};
