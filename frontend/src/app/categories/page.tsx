"use client"
import CategoryList from "@/components/organisms/CategoryList/CategoryList"
import { fetchFromAPI } from "@/app/lib/api"
import useDeviceType from "@/hooks/useDeviceType";
import { useEffect, useState } from "react";
import { mobileMainSyle, desktopMainSyle } from "@/constants/theme/theme_constants";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const isMobile = useDeviceType();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchFromAPI("categories?include=products");
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories ::: CategoriesPage', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={isMobile ? mobileMainSyle : desktopMainSyle}>
      <CategoryList categories={categories} />
    </div>
  )
}

