export const getInsiderTradingData = async (interval) => {
    const res = await fetch(`http://localhost:3000/api/insider-trading?range=${interval}`);
    return await res.json();
};
