import { Box } from "lucide-react";
import ProductsTable from "./ProductsTable";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";

const getData = async () => {
    try {
        const { data } = await axiosInstanceWithOfflineToken.get(
            "/api/offline/products/w"
        );
        return data.data || [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};

export default async function ProductsPage() {
    const products = await getData();

    return (<ProductsTable products={products} />);
}
