import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiSmartphone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="px-10vw md:px-15vw flex justify-between">
        <div className="w-[26%] min-w-[150px]">
          <h4 className="mb-1">About</h4>
          <p className="text-gray-600">
            Voluptatem accusantium doloremque laudentium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo eaque ipsa quse ab illo.
          </p>
        </div>

        <div className="w-[28%] min-w-[125px]">
          <h4 className="mb-1">Contact</h4>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="flex">
              <RiSendPlaneFill size={20} className="mr-1" />
              <p>
                Kalyani, Punnamada, Kottankulanga, Alappuzha, Kerala, 688006
              </p>
            </li>
            <li className="flex">
              <FiSmartphone className="mr-1" />
              <p>Phone: 043688006</p>
            </li>
            <li className="flex">
              <MdOutlineMail className="mr-1" />
              <p>Email: client@store.com</p>
            </li>
          </ul>
        </div>

        <div className="max-[480px]:hidden">
          <h4 className="mb-1">Categories</h4>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Headphones</li>
            <li>Smart Watches</li>
            <li>Bluetooth Speakers</li>
            <li>Wireless Earbuds</li>
            <li>Home Theatre</li>
            <li>Projectors</li>
          </ul>
        </div>

        <div className="hidden md:flex md:flex-col">
          <h4 className="mb-1">Pages</h4>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Privacy Policy</li>
            <li>Returns</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 px-15vw py-2 flex flex-col md:flex-row justify-center md:justify-between items-center border-t">
        <p className="text-[0.55rem] text-gray-600 uppercase">
          STORE 2023 created by developer | E-Commerce solutions.
        </p>
        <img
          src="payments.png"
          alt="payment options"
          className="w-44 mt-1 md:mt-0"
        />
      </div>
    </footer>
  );
};

export default Footer;
