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
    fetchAllCategories().then((response) => {
      setCategories(response);
    });
  }, []);

  return (
    <div className="w-full my-16 lg:my-24 px-5 lg-list:px-5vw xl-list:px-10vw 2xl-list:px-15vw grid grid-cols-2 md-list:grid-cols-4 gap-y-5">
      {categories.map((category) => {
        return (
          <Link
            to={`/category/${category.categoryId}`}
            key={category.categoryId}
            className="w-full overflow-hidden"
          >
            <img
              src={ServerUrl + category.image}
              alt={category.title}
              className="w-11/12 md-list:aspect-video hover:scale-110 transition-all rounded"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
