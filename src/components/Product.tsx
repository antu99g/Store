import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { ServerUrl } from "../api";
import { FaRupeeSign, FaRegHeart, FaHeart } from "react-icons/fa";

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
  product: ProductType;
}

const Product: React.FC<PropType> = ({ product }) => {
  const wishlist = useSelector(
    (state: { wishlist: ProductType[] }) => state.wishlist
  );

  const wishlistItemId = wishlist.filter((item) => item.id === product.id);

  const isInWishlist = wishlistItemId.length > 0;

  const dispatch = useDispatch();

  const addItemInWishlist = () => {
    if (product) {
      dispatch(addToWishlist(product));
    }
  };

  const removeItemFromWishlist = () => {
    if (product) {
      dispatch(removeFromWishlist(product.id));
    }
  };

  const likeBtnStyles = "absolute top-2 right-2 z-2 text-slate-500";

  return (
    <div className="w-[15vw] min-w-[150px] flex flex-col justify-self-center">
      <div className="w-full px-2 py-4 md-list:py-5 relative bg-stone-200 overflow-hidden rounded-lg">
        {isInWishlist ? (
          <FaHeart className={likeBtnStyles} onClick={removeItemFromWishlist} />
        ) : (
          <FaRegHeart className={likeBtnStyles} onClick={addItemInWishlist} />
        )}

        <Link to={`/product/${product.id}`}>
          <img
            src={ServerUrl + product.image}
            alt={product.title}
            className="relative hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <h4 className="mt-2 text-sm text-gray-700 text-ellipsis whitespace-nowrap overflow-hidden">
        {product.title}
      </h4>

      <h3 className="flex items-center">
        <FaRupeeSign />
        {product.price}
      </h3>
    </div>
  );
};

export default Product;
