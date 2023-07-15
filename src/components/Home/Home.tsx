import { useEffect, useState } from "react";
import {
  Banner,
  Category,
  ProductList,
  Newsletter,
  Footer,
  ItemSkeleton,
} from "..";
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

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await fetchPopularProducts();
      setPopularProducts(response);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="pt-12">
      <Banner isModalVisible={isModalVisible} />

      <Category />

      {loading ? (
        <ItemSkeleton length="medium" />
      ) : (
        <ProductList
          header="Popular Products"
          productList={popularProducts}
          showSortSection={false}
          showCartModal={showCartModal}
        />
      )}

      <Newsletter />

      <Footer />
    </div>
  );
};

export default Home;
