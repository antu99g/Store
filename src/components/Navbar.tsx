import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { Cart, Search } from ".";

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
}

interface PropType {
  isCartVisible: boolean;
  showCartModal: (state: boolean) => void;
  isSearchVisible: boolean;
  showSearchModal: (state: boolean) => void;
}

const Navbar: React.FC<PropType> = ({
  isCartVisible,
  showCartModal,
  isSearchVisible,
  showSearchModal,
}) => {
  const navigate = useNavigate();

  const cart = useSelector((state: CartState) => state.cart);

  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    if (cart.length > 0) {
      const totalCount = cart.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      setTotalItems(totalCount);
    } else {
      setTotalItems(0);
    }
  }, [cart]);

  return (
    <>
      <nav className="w-screen py-1.5 lg:py-2 px-4 md:px-10 lg:px-44 absolute z-10 top-0 left-0 flex items-center justify-between bg-[#212121] text-white">
        <div className="hidden md:flex gap-x-4 text-[0.7rem]">
          <Link to="/">HOME</Link>
          <span>ABOUT</span>
          <span>CATEGORY</span>
        </div>

        <h1 className="md:-translate-x-1/2">STORE.</h1>

        <div className="flex items-center gap-x-8 md:gap-x-5">
          <Link to="/" className="md:hidden">
            <HiHome size={16} />
          </Link>

          <FiSearch onClick={showSearchModal} />
          <FiHeart onClick={() => navigate("/wishlist")} />
          <span
            className="relative cursor-pointer"
            onClick={() => showCartModal(true)}
          >
            <BsCart2 />
            <span className="absolute -top-1.5 -right-1.5 px-1 text-[0.55rem] bg-purple rounded-full">
              {totalItems}
            </span>
          </span>
        </div>
      </nav>

      {isCartVisible && <Cart showCartModal={showCartModal} />}

      {isSearchVisible && <Search showSearchModal={showSearchModal} />}
    </>
  );
};

export default Navbar;
