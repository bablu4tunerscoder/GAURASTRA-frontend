// server component (app/(public)/category/[...slug]/page.jsx)

// import { BASE_URL } from "@/helpers/axiosinstance"; // or use hardcoded
import axiosInstance from "@/helpers/axiosinstance";
import CategoryPageClient from "./category_page_client";

async function GetData(slugArray) {
  try {
    const category = slugArray[0] || null;
    const subcategory = slugArray[1] || null;
    const { data } = await axiosInstance.post(
      "/api/Productes/product-page-filter",
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
  const { slug } = await params ?? [];
  const products = await GetData(slug);

  return <CategoryPageClient initialProducts={products} initialSlug={slug} />;
}
