import { getMarque } from "./marquee.api";

export const getMarqueOptions = () => {
    return { queryKey: ["marque"], queryFn: getMarque, select: ({ data }) => data };
};

export const getMockDataOptions = () => {
    return {
        queryKey: ["mock"],
        queryFn: async () => {
            const data = await fetch(`/api/mock`);
            return await data.json();
        },
        select: ({ data }) => data,
    };
};
