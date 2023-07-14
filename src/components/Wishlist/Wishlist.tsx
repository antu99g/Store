import React from "react";
import { useSelector } from "react-redux";
import { ProductList } from "..";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

const Wishlist: React.FC = () => {
  const wishlist = useSelector(
    (state: { wishlist: ProductType[] }) => state.wishlist
  );

  return (
    <div className="my-20">
      <ProductList
        header={"Wishlist"}
        productList={wishlist}
        isCategorySection={true}
      />
    </div>
  );
};

export default Wishlist;
