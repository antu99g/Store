import { useEffect, useState } from "react";
import { Banner, Category, ProductList, Newsletter, Footer } from "..";
import { fetchPopularProducts } from "../../api";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

interface PropType {
  isModalVisible: boolean;
  showCartModal: (state: boolean) => void;
}

const Home: React.FC<PropType> = ({ isModalVisible, showCartModal }) => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchPopularProducts();
      setPopularProducts(response);
    })();
  }, []);

  return (
    <div className="pt-12">
      <Banner isModalVisible={isModalVisible} />

      <Category />

      <ProductList
        header="Popular Products"
        productList={popularProducts}
        showSortSection={false}
        showCartModal={showCartModal}
      />

      <Newsletter />

      <Footer />
    </div>
  );
};

export default Home;
