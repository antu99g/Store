import { useLayoutEffect, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductList } from "../";
import { ServerUrl, fetchProductById, fetchRelatedProducts } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  increaseQty,
  decreaseQty,
} from "../../store/slices/cartSlice";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterest,
} from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

interface CartItemType extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItemType[];
}

interface PropType {
  showCartModal: () => void;
}

const ProductDetails: React.FC<PropType> = ({ showCartModal }) => {
  const cart = useSelector((state: CartState) => state.cart);

  const dispatch = useDispatch();

  const params = useParams();

  const [product, setProduct] = useState<Product>();

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const [quantity, setQuantity] = useState<number>(1);

  const [isCartItem, setIsCartItem] = useState<boolean>(false);

  useLayoutEffect(() => {
    (async () => {
      if (params.id) {
        const productDetails = await fetchProductById(params.id);
        setProduct(productDetails);
        const response = await fetchRelatedProducts(params.id);
        setRelatedProducts(response);
      }
    })();
  }, [params.id]);

  useEffect(() => {
    const checkCart = cart.find((item) => item.id === Number(params.id));
    setIsCartItem(() => (checkCart ? true : false));
  }, [cart, params.id]);

  useEffect(() => {
    if (isCartItem) {
      const cartItemIndex = cart.findIndex(
        (item) => item.id === Number(params.id)
      );
      if (cartItemIndex !== -1) {
        setQuantity(cart[cartItemIndex].quantity);
      }
    }
  }, [cart, isCartItem, params.id]);

  useEffect(() => {
    if (!isCartItem) {
      setQuantity(1);
    }
  }, [isCartItem]);

  const increaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
    if (isCartItem && params.id) {
      dispatch(increaseQty(params.id));
      showCartModal();
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
      if (isCartItem && params.id) {
        dispatch(decreaseQty(params.id));
        showCartModal();
      }
    }
  };

  const handleCartBtnClick = () => {
    if (!isCartItem && product) {
      const itemToAdd = { ...product, quantity };
      dispatch(addItem(itemToAdd));
    }
    showCartModal();
  };

  return (
    <div className="w-full pt-24">
      <div className="w-full mx-auto px-5vw md:px-10vw lg:px-[15vw] flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start">
        <div className="w-[47%] mb-5 md:mb-0 grid place-content-center bg-lightgrey">
          <img src={ServerUrl + product?.image} alt={product?.title} />
        </div>

        <div className="w-5/6 md:w-1/2 flex flex-col">
          <h1>{product?.title}</h1>
          <p className="-mt-1.5 mb-2 md:max-xl-list:mb-0 font-medium text-base text-slate-600">
            {product?.config}
          </p>
          <h2 className="flex items-center">
            <FaRupeeSign />
            {product?.price}
          </h2>
          <p className="my-3 md:max-xl-list:my-1 text-gray-600 text-[0.8rem] md:max-xl-list:text-xs">
            {product?.description}
          </p>

          <div className="mt-4 md:max-xl-list:mt-0 flex items-center">
            <span className="flex items-center border divide-x">
              <button
                className="px-3 text-lg bg-gray-200 hover:bg-gray-300"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-5 py-1.5 font-medium">{quantity}</span>
              <button
                className="px-3 text-lg bg-gray-200 hover:bg-gray-300"
                onClick={increaseQuantity}
              >
                +
              </button>
            </span>

            <button
              className="ml-3 py-2 px-5 flex items-center bg-violet-600 text-white hover:bg-violet-800"
              onClick={handleCartBtnClick}
            >
              <FaShoppingCart className="mr-1" />
              {isCartItem ? "GO TO CART" : "ADD TO CART"}
            </button>
          </div>

          <span className="w-full mt-3 md:max-xl-list:hidden border" />

          <div className="my-2 md:max-xl-list:mb-0">
            <span className="mr-1 text-[0.8rem] font-bold">Category:</span>
            <span className="text-gray-600 text-[0.7rem]">
              {product?.category}
            </span>
          </div>

          <div className="flex items-center">
            <span className="mr-2 text-[0.8rem] font-bold">Share:</span>
            <span className="flex items-center gap-x-2 text-gray-600">
              <FaFacebookF className="w-2" />
              <FaTwitter className="w-3" />
              <GrInstagram className="w-3" />
              <FaLinkedinIn className="w-3" />
              <FaPinterest className="w-3.5" />
            </span>
          </div>
        </div>
      </div>

      <ProductList header="Related Products" productList={relatedProducts} />
    </div>
  );
};

export default ProductDetails;
