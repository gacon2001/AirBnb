import "./header.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import NavbarFull from "../Navbar/NavbarFull";
import { dataSlider } from "./dataSlider";

export default function Header() {
  return (
    <div className="header w-screen h-screen relative">
      <div className="absolute top-0 left-1/2 z-20  -translate-x-1/2">
        <NavbarFull type="home" />
      </div>

      {/* <div className="w-[1120px] mx-auto  h-[550px] mt-7  "> */}
      <div className="w-full h-full">
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={false}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper w-full h-full object-cover object-center"
        >
          {dataSlider.map((pic, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="w-full h-full object-cover object-center backdrop-blur-3xl">
                  <img
                    src={pic.src}
                    alt=""
                    className=" w-full h-full object-cover object-center blur-xl "
                  />
                </div>
                <div className="w-[1120px] mx-auto h-[550px] mt-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-white shadow-2xl">
                  <img
                    src={pic.src}
                    alt=""
                    className=" w-full h-full object-cover object-center rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
