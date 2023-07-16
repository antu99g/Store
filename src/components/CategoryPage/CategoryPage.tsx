import React, { useState, useEffect } from "react";
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

interface PropType {
  showCartModal: (state: boolean) => void;
}

const CategoryPage: React.FC<PropType> = ({ showCartModal }) => {
  const params = useParams();

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (params.categoryId) {
        const response = await fetchCategoryProducts(params.categoryId);
        setProducts(response);
        setLoading(false);
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
          showCartModal={showCartModal}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CategoryPage;
