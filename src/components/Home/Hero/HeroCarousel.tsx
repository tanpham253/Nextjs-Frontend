"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getServerImageSrc } from "@/helper/imageLink.helper";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const HeroCarousal = () => {

  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/v1/banners`);
        const json = await res.json();
        // console.log("Banners fetched:", json);

        if (res.ok) {
          // Optional: only show banners for slideshow
          setBanners(json.filter((b: any) => b.position === "slideshow"));
        } else {
          console.error("Failed to fetch banners:", json.message);
        }
        console.log("Banners fetched:", banners);
      } catch (error) {
        console.error("Fetch banners failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <p>Loading banners...</p>;

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
        {banners.map((banner, index) => (
        <SwiperSlide key={banner._id || index}>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse">
            <Image
                src={getServerImageSrc(banner.img)}
                alt={banner.name}
                width={757}
                height={554}
                className="object-cover w-[757px] h-[554px] rounded-[10px]"
              />
            {/* <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                {banner.name}
              </h1>
              <p className="text-dark-4 text-sm mb-4 capitalize">
                {banner.slug.replace(/-/g, " ")}
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-5"
              >
                Shop Now
              </a>
            </div>

            <div>
              <Image
                src={getServerImageSrc(banner.img)}
                alt={banner.name}
                width={351}
                height={358}
                className="object-contain"
              />
            </div> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
