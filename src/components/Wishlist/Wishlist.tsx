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

interface PropType {
  showCartModal?: (state: boolean) => void;
}

const Wishlist: React.FC<PropType> = ({ showCartModal }) => {
  const wishlist = useSelector(
    (state: { wishlist: ProductType[] }) => state.wishlist
  );

  return (
    <div className="my-20">
      <ProductList
        header={"Wishlist"}
        productList={wishlist}
        showSortSection={true}
        showCartModal={showCartModal}
      />
    </div>
  );
};

export default Wishlist;
