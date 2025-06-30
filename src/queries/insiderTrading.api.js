export const getInsiderTradingData = async (interval) => {
    const res = await fetch(`/api/insider-trading?range=${interval}`);
    return await res.json();
};
