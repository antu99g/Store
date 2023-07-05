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

const Home: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchPopularProducts();
      setPopularProducts(response);
    })();
  }, []);

  return (
    <div className="pt-12">
      <Banner />

      <Category />

      <ProductList header="Popular Products" productList={popularProducts} />

      <Newsletter />

      <Footer />
    </div>
  );
};

export default Home;
