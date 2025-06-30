import { getMarque } from "./marquee.api";

export const getMarqueOptions = () => {
    return { queryKey: ["marque"], queryFn: getMarque, select: ({ data }) => data };
};
