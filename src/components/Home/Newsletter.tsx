import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Newsletter: React.FC = () => {
  return (
    <div className="w-full my-10 py-10 flex flex-col items-center bg-[url('newsletter-bg.jpg')] bg-lightgrey bg-cover">
      <h6 className="text-gray-500 font-semibold">NEWSLETTER</h6>
      <h3 className="mt-1 mb-2">SIGN UP FOR LATEST UPDATES AND OFFERS</h3>
      <form className="flex">
        <input
          type="email"
          placeholder="Email Address"
          className="w-[15vw] min-w-[150px] pl-2 py-1 border"
        />
        <button
          type="submit"
          className="ml-1 py-0.5 px-3.5 text-white bg-violet-700 hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-1.5 mb-2.5 text-gray-500">
        Will be used in accordance with our Privacy Policy
      </p>

      <div className="flex gap-3">
        <span className="p-1 bg-slate-900 rounded-full">
          <FaFacebookF size={12} className="bg-slate-900 text-white" />
        </span>
        <span className="p-1 bg-slate-900 rounded-full">
          <FaTwitter size={12} className="bg-slate-900 text-white" />
        </span>
        <span className="p-1 bg-slate-900 rounded-full">
          <FaInstagram size={12} className="bg-slate-900 text-white" />
        </span>
        <span className="p-1 bg-slate-900 rounded-full">
          <FaLinkedinIn size={12} className="bg-slate-900 text-white" />
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
