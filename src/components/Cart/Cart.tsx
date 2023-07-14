import { useState } from "react";
import { useSelector } from "react-redux";
import { initiatePayment } from "../../api";
import { CartItem } from "..";
import { FaRupeeSign } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";

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

interface CartState {
  cart: CartItemType[];
  wishlist: string[];
}

interface PropType {
  hideCartModal: () => void;
}

const Cart: React.FC<PropType> = ({ hideCartModal }) => {
  const cart = useSelector((state: CartState) => state.cart);

  const subtotal = cart.reduce((total, item) => {
    const singleItemTotal = item.price * item.quantity;
    return total + singleItemTotal;
  }, 0);

  const [loadingPayment, setLoadingPayment] = useState<boolean>(false);

  const handleInitiatePayment = async () => {
    if (!loadingPayment) {
      setLoadingPayment(true);
      const items = cart.map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        };
      });
      const response = await initiatePayment(items);
      if (response.url) {
        window.location.replace(response.url);
        setLoadingPayment(false);
      }
    }
  };

  return (
    <div className="h-screen w-screen absolute z-40 top-0 left-0 text-sm bg-grey transition-all">
      <div className="w-[270px] h-full absolute top-0 left-0 flex flex-col bg-white rounded-r-lg animate-slideX">
        <div className="p-3 flex justify-between items-center border-b">
          <h4>SOPPING CART</h4>
          <button
            className="flex items-center font-semibold text-[0.75rem] hover:text-red-600"
            onClick={hideCartModal}
          >
            <FaXmark className="mr-0" />
            CLOSE
          </button>
        </div>

        {cart.length < 1 ? (
          <div className="mt-[60%] flex flex-col items-center">
            <BsCartX className="text-7xl text-gray-300" />
            <span className="mt-4 mb-2 font-medium text-slate-500">
              No products in the cart
            </span>
            <span
              className="py-1 px-4 bg-purple text-[0.75rem] text-white cursor-pointer"
              onClick={hideCartModal}
            >
              RETURN TO SHOP
            </span>
          </div>
        ) : (
          <div className="p-3 grow flex flex-col gap-y-5">
            {cart.map((item: CartItemType) => {
              return <CartItem item={item} key={item.id} />;
            })}
          </div>
        )}

        <div className="mt-auto p-3 flex justify-between border-y">
          <h4>SUBTOTAL:</h4>
          <h4 className="flex items-center text-violet-700">
            <FaRupeeSign />
            {subtotal}
          </h4>
        </div>

        <button
          className={`m-3 py-2 flex justify-center items-center text-white hover:bg-violet-700 ${
            loadingPayment ? "bg-violet-700" : "bg-purple"
          }`}
          onClick={handleInitiatePayment}
        >
          {loadingPayment ? (
            <>
              <BiLoaderAlt className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
