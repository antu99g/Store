import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ServerUrl, fetchSearchedProducts } from "../api";
import { FaXmark } from "react-icons/fa6";

interface PropType {
  showSearchModal: (state: boolean) => void;
}

interface SearchedProductType {
  id: number;
  title: string;
  image: string;
  config: string;
}

const Search: React.FC<PropType> = ({ showSearchModal }) => {
  const [searchedProducts, setSearchedProducts] = useState<
    SearchedProductType[]
  >([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setSearchedProducts([]);
    } else {
      const searchResult = await fetchSearchedProducts(e.target.value);
      setSearchedProducts(searchResult);
    }
  };

  return (
    <div className="h-screen w-screen py-7 md:py-10 absolute z-30 top-0 left-0 bg-gray-200 transition-all overflow-hidden">
      <div className="w-[80vw] md-list:w-[60vw] lg:w-[45vw] mx-auto relative flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for Products"
          onChange={handleInputChange}
          className="w-full py-2 md:py-3 px-3 md:px-6 text-lg placeholder:text-xl focus:outline-blue-600 rounded-md animate-focus"
        />
        <FaXmark
          className="absolute top-1/4 md:top-1/5 -right-8 md:-right-10 text-2xl hover:bg-white hover:p-1 rounded-full cursor-pointer"
          onClick={() => showSearchModal(false)}
        />
      </div>

      <div className="h-px my-6 bg-gray-400" />

      <div className="w-[80vw] md-list:w-[60vw] lg:w-[45vw] mx-auto grow flex flex-col gap-y-4 overflow-y-auto">
        {searchedProducts.map((product) => {
          return (
            <Link
              to={`/product/${product.id}`}
              onClick={() => showSearchModal(false)}
            >
              <div className="py-2 px-2 md-list:px-3 flex items-center bg-white rounded-md">
                <div className="w-[8%] min-w-[40px] mr-2 md:mr-3 bg-stone-200">
                  <img src={ServerUrl + product.image} alt="asdf" />
                </div>

                <div className="grow flex flex-col justify-center overflow-hidden">
                  <h4>{product.title}</h4>
                  <small className="text-[0.75rem] text-slate-600 font-medium  text-ellipsis whitespace-nowrap overflow-hidden">
                    {product.config}
                  </small>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
