import React from "react";

const SkeletonDetails: React.FC = () => {
  return (
    <>
      <div className="w-10/12 md-list:w-[47%] aspect-square mb-5 md:mb-0 relative grid place-content-center bg-gray-100 rounded-lg animate-pulse" />

      <div className="w-5/6 md:w-1/2 flex flex-col gap-4 animate-pulse">
        <div className="w-10/12 h-3 bg-gray-100 rounded-lg" />
        <div className="w-[70%] h-3 bg-gray-100 rounded-lg" />
        <div className="w-[30%] h-3 my-5 bg-gray-100 rounded-lg" />
        <div className="w-[65%] h-3 bg-gray-100 rounded-lg" />
        <div className="w-[65%] h-3 bg-gray-100 rounded-lg" />
        <div className="w-[65%] h-3 bg-gray-100 rounded-lg" />
        <div className="w-[65%] h-3 bg-gray-100 rounded-lg" />
        <div className="w-[65%] h-3 bg-gray-100 rounded-lg" />
        <div className="w-[40%] h-3 mt-5 bg-gray-100 rounded-lg" />
        <div className="w-[37%] h-3 bg-gray-100 rounded-lg" />
      </div>
    </>
  );
};

export default SkeletonDetails;
