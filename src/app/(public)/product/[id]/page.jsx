
import axiosInstance from "@/helpers/axiosinstance";
import ProductDetailClient from "./ProductDetailClient";

async function GetData(id) {
  try {
    const { data } = await axiosInstance.get(
      `/api/Productes/by-canonical/${id}`
    );

    return data?.data || null;
  } catch (error) {
    console.error("Server fetch error", error);
    return null;
  }
}


export default async function ProductDetailPage({ params }) {
  const { id } = await params || null;
  const product = await GetData(id);

  return (
    <ProductDetailClient
      initialProducts={product}
    />
  );
}
