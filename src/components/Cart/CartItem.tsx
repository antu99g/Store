import React from "react";
import { useDispatch } from "react-redux";
import {
  removeItem,
  increaseQty,
  decreaseQty,
} from "../../store/slices/cartSlice";
import { FaXmark } from "react-icons/fa6";
import { ServerUrl } from "../../api";

interface CartItemType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
  quantity: number;
}

interface PropType {
  item: CartItemType;
}

const CartItem: React.FC<PropType> = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (item) {
      dispatch(increaseQty(item.id));
    }
  };

  const decreaseQuantity = () => {
    if (item && item.quantity > 1) {
      dispatch(decreaseQty(item.id));
    }
  };

  const removeCartItem = () => {
    if (item) {
      dispatch(removeItem(item.id));
    }
  };

  return (
    <div className="w-full flex">
      <div className="h-min w-1/5 mr-2 bg-lightgrey">
        <img src={ServerUrl + item.image} alt={item.title} />
      </div>
      <div className="w-4/5 flex flex-col">
        <div className="max-w-full flex items-center">
          <h6 className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
            {item.title}
          </h6>

          <FaXmark
            className="ml-1 text-md hover:bg-red-600 hover:p-0.5 hover:text-white rounded-full"
            onClick={removeCartItem}
          />
        </div>

        <span className="w-min my-1 flex items-center border divide-x text-sm">
          <button className="px-1.5 bg-gray-100" onClick={decreaseQuantity}>
            -
          </button>
          <span className="px-3 text-xs">{item.quantity}</span>
          <button className="px-1.5 bg-gray-100" onClick={increaseQuantity}>
            +
          </button>
        </span>

        <div className="flex items-center text-xs text-purple">
          <span>{item.quantity}</span>
          <span className="mx-1">
            <FaXmark className="text-xs" />
          </span>
          <span>{item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
