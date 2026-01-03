import { Box } from "lucide-react";
import ProductsTable from "./ProductsTable";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";



export default async function ProductsPage() {
    

    return (<ProductsTable  />);
}
