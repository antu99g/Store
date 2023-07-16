import React from "react";
import { useSelector } from "react-redux";
import { ProductList } from "..";
import { Link } from "react-router-dom";

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
  showCartModal: (state: boolean) => void;
}

const Wishlist: React.FC<PropType> = ({ showCartModal }) => {
  const wishlist = useSelector(
    (state: { wishlist: ProductType[] }) => state.wishlist
  );

  return (
    <div className="my-20">
      {wishlist.length > 0 ? (
        <ProductList
          header={"Wishlist"}
          productList={wishlist}
          showSortSection={true}
          showCartModal={showCartModal}
          loading={false}
        />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="mt-48 text-3xl md-list:text-4xl text-gray-500">
            No itms in the Wishlist!
          </h1>
          <Link
            to="/"
            className="mt-16 md-list:mt-20 underline text-base text-blue-700"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
