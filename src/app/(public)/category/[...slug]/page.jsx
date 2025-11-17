import axios, { AxiosError } from "axios";
import DynamicCategoryClientPage from "./category_page_client";

import React from "react";

async function GetData(slugArray) {
  try {
    const { data } = await axios.post(
      `https://backend.gaurastra.com/api/Productes/filter-Products`,
      {
        category_name: slugArray[0] ,
        subcategory_name: slugArray[1],
      }
    );
    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("API Error:", error.response?.data?.message);
    } else {
      console.error("Unknown Error:", error);
    }
    return [];
  }
}

export default async function DynamicCategoryPage({ params }) {
  const {slug} = await params || []; // <-- Always safe
  
  const products = await GetData(slug);
 

  return (
    <>
      <DynamicCategoryClientPage products={products} slug={slug} />
    </>
  );
}
