import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Navbar,
  Home,
  CategoryPage,
  ProductDetails,
  PaymentStatus,
  Wishlist,
} from "./components";

const App: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const showCartModal = () => {
    setIsCartVisible(true);
  };

  const hideCartModal = () => {
    setIsCartVisible(false);
  };

  const showSearchModal = () => {
    setIsSearchVisible(true);
  };

  const hideSearchModal = () => {
    setIsSearchVisible(false);
  };

  return (
    <>
      <div
        className={`w-screen min-h-screen relative font-sans text-xs overflow-x-hidden ${
          (isCartVisible || isSearchVisible) && "h-screen overflow-y-hidden"
        }`}
      >
        <Navbar
          isCartVisible={isCartVisible}
          showCartModal={showCartModal}
          hideCartModal={hideCartModal}
          isSearchVisible={isSearchVisible}
          showSearchModal={showSearchModal}
          hideSearchModal={hideSearchModal}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route
            path="/product/:id"
            element={<ProductDetails showCartModal={showCartModal} />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment/:success" element={<PaymentStatus />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
