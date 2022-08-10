import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Navigation } from "swiper";

export default function RoomListItem({ list }) {
  const array = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <>
      {list.map((item, i) => {
        return (
          <div key={i} className="item py-5 flex border-b">
            <div className="img w-1/2 h-60 ">
              <div className="px-3 overflow-hidden w-full h-full rounded-xl">
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                  }}
                  loop={true}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper w-full h-full object-cover object-center rounded-xl"
                >
                  {array.map((pic, i) => {
                    return (
                      <SwiperSlide>
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover object-center rounded-xl"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="content w-1/2 px-3 text-left flex flex-col justify-between">
              <div className="top cursor-pointer">
                <span className="text-sm text-gray-300">
                  {`Private room in center of ${item.locationId.name}`}
                </span>
                <h3 className="text-lg hover:underline">{item.name}</h3>
                <hr className="hidden w-10 mt-3 mb-1 border-b border-gray-200 border-opacity-60 sm:block" />
                <span className="text-sm text-gray-300">
                  {item.guests} guest · {item.bedRoom} bedroom · {item.bath}{" "}
                  shared bathrooms · Wifi · Kitchen · Free parking · Washing
                  Machine
                </span>
              </div>
              <div className="bottom flex py-2 justify-between">
                <div className="rate">
                  <span>
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#ff385c" }}
                    />
                  </span>
                  <span className="mx-1 font-semibold">4.73</span>
                  <span className="mx-1 text-sm text-gray-400">(30 views)</span>
                </div>
                <div className="price">
                  <span className="font-semibold mr-2">
                    <span>
                      {/* <FontAwesomeIcon icon={faDollarSign} /> */} VND
                    </span>{" "}
                    {item.price}
                  </span>
                  <span className="font-light">/ night</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
