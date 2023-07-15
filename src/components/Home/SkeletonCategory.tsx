import React from "react";

const SkeletonCategory: React.FC = () => {
  const emptyArray = Array(4);

  return (
    <>
      {[...emptyArray].map((_, index) => {
        return (
          <div
            className="w-11/12 aspect-video bg-gray-100 rounded animate-pulse"
            key={index}
          />
        );
      })}
    </>
  );
};

export default SkeletonCategory;
