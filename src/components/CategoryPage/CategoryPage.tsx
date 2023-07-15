import React, { useState, useLayoutEffect } from "react";
import { ProductList } from "../";
import { useParams } from "react-router-dom";
import { fetchCategoryProducts } from "../../api";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

const CategoryPage: React.FC = () => {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useLayoutEffect(() => {
    (async () => {
      if (params.categoryId) {
        const response = await fetchCategoryProducts(params.categoryId);
        setProducts(response);
      }
    })();
  }, [params.categoryId]);

  return (
    <div className="my-20">
      {products.length > 0 && (
        <ProductList
          header={products[0].category}
          productList={products}
          showSortSection={true}
        />
      )}
    </div>
  );
};

export default CategoryPage;
