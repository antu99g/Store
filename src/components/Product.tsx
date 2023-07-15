import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { ServerUrl } from "../api";
import { FaRupeeSign, FaRegHeart, FaHeart, FaPlus } from "react-icons/fa";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

interface CartItemType extends ProductType {
  quantity: number;
}

interface PropType {
  product: ProductType;
  showCartModal?: (state: boolean) => void;
}

const Product: React.FC<PropType> = ({ product, showCartModal }) => {
  const wishlist = useSelector(
    (state: { wishlist: ProductType[] }) => state.wishlist
  );

  const wishlistItemId = wishlist.filter((item) => item.id === product.id);

  const isInWishlist = wishlistItemId.length > 0;

  const cart = useSelector((state: { cart: CartItemType[] }) => state.cart);

  const cartItemId = cart.filter((item) => item.id === product.id);

  const isCartItem = cartItemId.length > 0;

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

  const handleItemToCart = () => {
    if (isCartItem) {
      showCartModal(true);
    } else {
      const productToAdd = { ...product, quantity: 1 };
      dispatch(addItem(productToAdd));
      showCartModal(true);
    }
  };

  const likeBtnStyles = "ml-auto text-slate-500";

  return (
    <div className="w-[15vw] min-w-[150px] flex flex-col justify-self-center">
      <div className="w-full p-2 relative flex flex-col bg-stone-200 overflow-hidden rounded-lg">
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

        <button
          className="mr-auto px-1.5 py-px hover:py-0 flex items-center text-sm text-white bg-purple cursor-pointer rounded"
          onClick={handleItemToCart}
        >
          {isCartItem ? (
            "Added"
          ) : (
            <>
              <FaPlus className="mr-px text-xs" />
              <span>Add</span>
            </>
          )}
        </button>
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
