import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ServerUrl, fetchAllCategories } from "../api";

interface Category {
  categoryId: number;
  title: string;
  image: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchAllCategories();
      setCategories(response);
    })();
  }, []);

  return (
    <div className="w-full my-16 lg:my-24 px-5 lg-list:px-5vw xl-list:px-10vw 2xl-list:px-15vw flex justify-between gap-3 md:gap-2 flex-wrap md:flex-nowrap">
      {categories.map((category) => {
        return (
          <Link
            to={`/category/${category.categoryId}`}
            key={category.categoryId}
            className="w-[48%] md:w-auto overflow-hidden"
          >
            <img
              src={ServerUrl + category.image}
              alt={category.title}
              className="w-full hover:scale-110 transition-all"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
