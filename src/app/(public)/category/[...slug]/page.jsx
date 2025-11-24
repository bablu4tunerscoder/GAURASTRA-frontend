// server component (app/(public)/category/[...slug]/page.jsx)

// import { BASE_URL } from "@/Helper/axiosinstance"; // or use hardcoded
import axios from "axios";
import CategoryPageClient from "./category_page_client";
import axiosInstance from "@/Helper/axiosinstance";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

async function GetData(slugArray) {
  try {
    const category = slugArray[0] || null;
    const subcategory = slugArray[1] || null;
    const { data } = await axiosInstance.post(
      "/api/Productes/filter-Products",
      {
        category_name: category,
        subcategory_name: subcategory,
      }
    );
    return data.data || [];
  } catch (error) {
    console.error("Server fetch error", error);
    return [];
  }
}

export default async function DynamicCategoryPage({ params }) {
  const { slug }= await params ?? [];
  const products = await GetData(slug);
  

  return <CategoryPageClient initialProducts={products} initialSlug={slug} />;
}
