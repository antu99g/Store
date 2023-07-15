import React from "react";

interface PropType {
  length: string;
}

const ItemSkeleton: React.FC<PropType> = ({ length }) => {
  const emptyArray = length === "small" ? Array(4) : Array(6);

  return (
    <div className="w-full grid grid-cols-2 sm-list:grid-cols-3 md-list:grid-cols-4 gap-x-1 gap-y-7 animate-pulse">
      {[...emptyArray].map((_, index) => {
        return (
          <div
            className="w-[15vw] min-w-[150px] flex flex-col justify-self-center"
            key={index}
          >
            <div className="w-full h-[172px] bg-gray-100 rounded-lg" />
            <div className="w-[85%] h-3 my-2 bg-gray-100 rounded-lg" />
            <div className="w-[40%] h-3 bg-gray-100 rounded-lg" />
          </div>
        );
      })}
    </div>
  );
};

export default ItemSkeleton;
