export const getMarque = async () => {
    const res = await fetch(`/api/marque`);
    return await res.json();
};
