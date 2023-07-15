import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ItemSkeleton, ProductList } from "../";
import { ServerUrl, fetchProductById, fetchRelatedProducts } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  increaseQty,
  decreaseQty,
} from "../../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterest,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import SkeletonDetails from "./SkeletonDetails";

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
  showCartModal: (state: boolean) => void;
}

const ProductDetails: React.FC<PropType> = ({ showCartModal }) => {
  const cart = useSelector((state: { cart: CartItemType[] }) => state.cart);

  const wishlist = useSelector(
    (state: { wishlist: ProductType[] }) => state.wishlist
  );

  const dispatch = useDispatch();

  const { id: productId } = useParams();

  const location = useLocation();

  const [product, setProduct] = useState<ProductType>();

  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

  const [quantity, setQuantity] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const presentIsCart = cart.filter((item) => item.id === Number(productId));

  const isCartItem = presentIsCart.length > 0;

  const wishlistItemId = wishlist.filter(
    (item) => item.id === Number(productId)
  );

  const isInWishlist = wishlistItemId.length > 0;

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

  useEffect(() => {
    setLoading(true);
    setLoadingProducts(true);
    (async () => {
      if (productId) {
        const productDetails = await fetchProductById(productId);
        setProduct(productDetails);
        setLoading(false);
        const response = await fetchRelatedProducts(productId);
        setRelatedProducts(response);
        setLoadingProducts(false);
      }
    })();
  }, [productId]);

  useEffect(() => {
    if (isCartItem) {
      const cartItemIndex = cart.findIndex(
        (item) => item.id === Number(productId)
      );
      if (cartItemIndex !== -1) {
        setQuantity(cart[cartItemIndex].quantity);
      }
    } else if (!isCartItem) {
      setQuantity(1);
    }
  }, [cart, isCartItem, productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const increaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
    if (isCartItem && productId) {
      dispatch(increaseQty(productId));
      showCartModal(true);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
      if (isCartItem && productId) {
        dispatch(decreaseQty(productId));
        showCartModal(true);
      }
    }
  };

  const handleCartBtnClick = () => {
    if (!isCartItem && product) {
      const itemToAdd = { ...product, quantity };
      dispatch(addItem(itemToAdd));
    }
    showCartModal(true);
  };

  const likeBtnStyles =
    "absolute top-1 right-1 md:top-3 md:right-3 z-2 text-lg md:text-2xl text-slate-500";

  return (
    <div className="w-full pt-24">
      <div className="w-full mx-auto px-5vw xl-list:px-10vw lg:px-[15vw] flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start">
        {loading ? (
          <SkeletonDetails />
        ) : (
          <>
            <div className="w-10/12 md-list:w-[47%] mb-5 md:mb-0 relative grid place-content-center bg-stone-200 rounded-lg">
              {isInWishlist ? (
                <FaHeart
                  className={likeBtnStyles}
                  onClick={removeItemFromWishlist}
                />
              ) : (
                <FaRegHeart
                  className={likeBtnStyles}
                  onClick={addItemInWishlist}
                />
              )}

              <img src={ServerUrl + product?.image} alt={product?.title} />
            </div>

            <div className="w-5/6 md:w-1/2 flex flex-col">
              <h1 className="mb-4 md:mb-2 leading-7">{product?.title}</h1>
              <p className="-mt-1.5 mb-2 md:max-xl-list:mb-0 font-medium text-base text-slate-600 leading-tight">
                {product?.config}
              </p>
              <h2 className="flex items-center">
                <FaRupeeSign />
                {product?.price}
              </h2>
              <p className="my-3 md:max-xl-list:my-1 text-gray-600 text-[0.8rem] md:max-xl-list:text-2xs">
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
          </>
        )}
      </div>

      {loadingProducts ? (
        <ItemSkeleton length="small" />
      ) : (
        <ProductList
          header="Related Products"
          productList={relatedProducts}
          showSortSection={false}
          showCartModal={showCartModal}
        />
      )}
    </div>
  );
};

export default ProductDetails;
