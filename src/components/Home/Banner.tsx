import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface PropType {
  isModalVisible: boolean;
}

const bannerItems = [
  {
    label: "TRebel Airdopes 141 | With ENxTM Technology",
    image: "earbuds-prod-1.webp",
    background: "#19A7CE, #B0DAFF",
    text: "rgb(6 182 212)",
  },
  {
    label: "boAt Rockerz 450 | Wireless Headphone",
    image: "headphone-prod-1.webp",
    background: "#F24C3D, #F29727",
    text: "rgb(75 85 99)",
  },
  {
    label: "boAt Vertex | Smartwatch with Fitness Trackers",
    image: "watch-prod-3.webp",
    background: "#526D82, #9DB2BF",
    text: "rgb(71 85 105)",
  },
  {
    label: "Rockerz 550 | Over Ear Bluetooth Headphone",
    image: "headphone-prod-5.webp",
    background: "#45CFDD, #FFFEC4",
    text: "rgb(20 184 166)",
  },
];

const Banner: React.FC<PropType> = ({ isModalVisible }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const textRef = useRef<HTMLDivElement>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const [currentBanner, setCurrentBanner] = useState<number>(0);

  const isAnimatingRef = useRef<boolean>(false);

  const isPausedRef = useRef<boolean>(false);

  const removeCurrentBanner = () => {
    if (!isPausedRef.current && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      gsap.to([bgRef.current], {
        delay: 3,
        duration: 0.3,
        x: "100vw",
        ease: "Power1.in",
        onComplete: () => {
          isAnimatingRef.current = false;
          changeBanner();
        },
      });
      gsap.to([contentRef.current], {
        delay: 3,
        duration: 0.1,
        opacity: 0,
      });
    }
  };

  const changeBanner = () => {
    setCurrentBanner((prevIndex) =>
      prevIndex === bannerItems.length - 1 ? 0 : prevIndex + 1
    );
    slideNextBanner();
  };

  const slideNextBanner = () => {
    gsap.fromTo(
      [bgRef.current],
      { x: "-100vw" },
      {
        delay: 0.3,
        duration: 0.6,
        x: 0,
        ease: "Power2.out",
      }
    );
    gsap.fromTo(
      [imageRef.current],
      { x: 40 },
      {
        delay: 0.5,
        duration: 1.5,
        x: 0,
        ease: "Power4.out",
      }
    );
    gsap.fromTo(
      [textRef.current],
      { y: 40 },
      {
        delay: 0.5,
        duration: 1.5,
        y: 0,
        ease: "Power4.out",
      }
    );
    gsap.to([contentRef.current], {
      delay: 0.5,
      duration: 2.5,
      opacity: 1,
      ease: "Power4.out",
      onComplete: () => {
        if (!isPausedRef.current && !isModalVisible) {
          removeCurrentBanner();
        }
      },
    });
  };

  useEffect(() => {
    removeCurrentBanner();
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      isPausedRef.current = true;
    } else {
      isPausedRef.current = false;
      removeCurrentBanner();
    }
  }, [isModalVisible]);

  return (
    <div
      className="h-[73vh] w-full relative overflow-hidden"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
        removeCurrentBanner();
      }}
    >
      <div
        ref={bgRef}
        className="h-full w-full absolute z-1 left-0 top-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${bannerItems[currentBanner].background})`,
        }}
      />
      <div
        ref={contentRef}
        className="h-full w-full absolute z-2 left-0 top-0 flex flex-col-reverse md:flex-row justify-center items-center bg-transparent"
      >
        <div
          ref={textRef}
          className="mt-4 min-[580px]:mt-0 md:ml-16 flex flex-col items-center justify-between text-white"
        >
          <h1 className="text-7xl md:text-8xl">SALE</h1>
          <p className="mt-3 mb-5 text-sm text-center">
            {bannerItems[currentBanner].label}
          </p>
          <div>
            <button className="mr-5 py-1.5 px-3 border uppercase hover:opacity-80">
              Read More
            </button>
            <button
              className={`py-1.5 px-3 uppercase border bg-white hover:opacity-80`}
              style={{ color: bannerItems[currentBanner].text }}
            >
              Shop Now
            </button>
          </div>
        </div>

        <img
          ref={imageRef}
          src={bannerItems[currentBanner].image}
          alt="product"
          className="w-[45%] md-list:w-[35%] md:ml-5"
        />
      </div>
    </div>
  );
};

export default Banner;
