
import axiosInstance from "@/Helper/axiosinstance";
import ProductDetailClient from "./ProductDetailClient";
import { use } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
async function GetData(id) {
  try {
    const { data } = await axios.get(
     BASE_URL +`/api/Productes/product/${id}`
    );

    console.log("server detail", data);
    return data?.data || null;
  } catch (error) {
    console.error("Server fetch error", error);
    return null;
  }
}


export default async function ProductDetailPage({ params }) {
  const {id} = await params || null;
  const product = await GetData(id);

  return (
    <ProductDetailClient 
      // initialProducts={product} 
      // initialId={id} 
    />
  );
}
