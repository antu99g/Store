import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ServerUrl, fetchAllCategories } from "../../api";
import SkeletonCategory from "./SkeletonCategory";

interface Category {
  categoryId: number;
  title: string;
  image: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchAllCategories().then((response: Category[]) => {
      setCategories(response);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full my-16 md:my-20 lg:mt-24 px-5 lg-list:px-5vw xl-list:px-10vw 2xl-list:px-15vw grid grid-cols-2 md-list:grid-cols-4 gap-y-5">
      {loading ? (
        <SkeletonCategory />
      ) : (
        categories.map((category) => {
          return (
            <Link
              to={`/category/${category.categoryId}`}
              key={category.categoryId}
              className="w-11/12 md-list:aspect-video overflow-hidden"
            >
              <img
                src={ServerUrl + category.image}
                alt={category.title}
                className="w-full md-list:aspect-video hover:scale-110 transition-all"
              />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Category;
