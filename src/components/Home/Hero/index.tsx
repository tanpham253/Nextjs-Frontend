'use client';
import React, { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { getServerImageSrc } from "@/helper/imageLink.helper";

const Hero = () => {
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [upperBanner, setUpperBanner] = useState<any>(null);
  const [belowBanner, setBelowBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/v1/banners`);
        const json = await res.json();

        if (res.ok) {
          setUpperBanner(json.find((b: any) => b.position === "upper"));
          setBelowBanner(json.find((b: any) => b.position === "below"));
        } else {
          console.error("Failed to fetch banners:", json.message);
        }
      } catch (error) {
        console.error("Fetch banners failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <p>Loading hero banners...</p>;

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          {/* Left: Carousel */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              <HeroCarousel />
            </div>
          </div>

          {/* Right: Upper & Below banners */}
          <div className="xl:max-w-[393px] w-full flex flex-col gap-5">
            {upperBanner && (
              <div className="relative rounded-[10px] bg-white overflow-hidden">
                <Image
                  src={getServerImageSrc(upperBanner.img)}
                  alt={upperBanner.name}
                  width={393}
                  height={267}
                  className="object-cover w-full h-[267px]"
                  unoptimized
                />
              </div>
            )}

            {belowBanner && (
              <div className="relative rounded-[10px] bg-white overflow-hidden">
                <Image
                  src={getServerImageSrc(belowBanner.img)}
                  alt={belowBanner.name}
                  width={393}
                  height={267}
                  className="object-cover w-full h-[267px]"
                  unoptimized
                />
              </div>
            )}

          {/* <div className="xl:max-w-[757px] w-full xl:max-h-[549px] y-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                      <a href="#"> iPhone 14 Plus & 14 Pro Max </a>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/images/hero/hero-02.png"
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                      <a href="#"> Wireless Headphone </a>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/images/hero/hero-01.png"
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>

              
            </div>
          </div> */}
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      {/* <HeroFeature /> */}
    </section>
  );
};

export default Hero;
