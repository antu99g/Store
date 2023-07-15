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

  const showCartModal = (state: boolean) => {
    if (typeof state === "boolean") {
      setIsCartVisible(state);
    } else {
      setIsCartVisible((prevState) => !prevState);
    }
  };

  const showSearchModal = (state: boolean) => {
    if (typeof state === "boolean") {
      setIsSearchVisible(state);
    } else {
      setIsSearchVisible((prevState) => !prevState);
    }
  };

  return (
    <>
      <div
        className={`w-screen min-h-screen relative font-sans text-2xs overflow-x-hidden ${
          (isCartVisible || isSearchVisible) && "h-screen overflow-y-hidden"
        }`}
      >
        <Navbar
          isCartVisible={isCartVisible}
          showCartModal={showCartModal}
          isSearchVisible={isSearchVisible}
          showSearchModal={showSearchModal}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                isModalVisible={isCartVisible || isSearchVisible}
                showCartModal={showCartModal}
              />
            }
          />
          <Route
            path="/category/:categoryId"
            element={<CategoryPage showCartModal={showCartModal} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails showCartModal={showCartModal} />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist showCartModal={showCartModal} />}
          />
          <Route path="/payment/:success" element={<PaymentStatus />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
