import "./header.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import NavbarFull from "../Navbar/NavbarFull";
import { dataSlider } from "./dataSlider";
import { memo } from "react";
import useWindowDimensions from "../../HOOK/useWindowDimensions";
import SearchButton from "../Navbar/SearchButton";
import { Link, useNavigate } from "react-router-dom";
import LogoSmall from "../logo/LogoSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, notification, Tooltip } from "antd";
import {
  setUserAvatar,
  setUserLogin,
  setUserToken,
} from "../../redux/slices/userSlice";
import { localStorageService } from "../../services/localStorageService";

function Header() {
  let userInfor = useSelector((state) => state.userSlice.userInfo);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  let handleLogout = () => {
    openNotificationWithIcon("success", "Goodbye " + userInfor.name);
    dispatch(setUserLogin(null));
    dispatch(setUserAvatar(false));
    dispatch(setUserToken(null));
    localStorageService.removeUserInfo();
    localStorageService.removeUserToken();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
  const { height, width } = useWindowDimensions();
  // console.log("width, height", width, height);
  return (
    <div className="header w-full h-[500px] md:w-screen md:h-screen relative overflow-x-hidden">
      <div className="absolute lg:w-full mx-auto top-0 left-1/2 z-20 -translate-x-1/2">
        {width < 768 ? (
          <div className="pt-12">
            <SearchButton type={"home"} />
          </div>
        ) : (
          <NavbarFull type="home" />
        )}
      </div>

      <div className="w-full h-full">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          loop={true}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper w-full h-full"
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
                <div className="w-3/4 h-1/2 xl:w-[1120px] mx-auto xl:h-[500px] mt-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-white shadow-2xl">
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
      {width < 768 && (
        <div className="w-full h-max bg-white border-t border-gray-300 shadow-md fixed bottom-0 z-40 rounded-t-lg ">
          <div className="w-[300px] py-3 mx-auto flex flex-row items-center justify-between">
            <div className="logo">
              <Link to="/">
                <div className={`flex items-center h-12 text-[#ff385c]`}>
                  <LogoSmall />
                </div>
              </Link>
            </div>
            <div className="explore">
              <div className=" px-3 py-2 bg-white border border-gray-200 rounded-full h-max hover:shadow-md cursor-pointer  text-[#ff385c]">
                <a href="/#nearby">
                  <FontAwesomeIcon icon={faSearch} />
                </a>
              </div>{" "}
            </div>
            <div className="user">
              <div className="flex items-center justify-end">
                <div className="userSmall relative">
                  <div className="flex items-center justify-between px-2 py-2 bg-white rounded-full h-max hover:shadow-md cursor-pointer">
                    <span className="h-10 text-4xl text-gray-400">
                      {!userInfor && <FontAwesomeIcon icon={faCircleUser} />}
                      {userInfor && (
                        <Tooltip title={userInfor.name} placement="leftTop">
                          <Badge dot>
                            <Avatar
                              size={36}
                              className="mb-4"
                              src={userInfor.avatar}
                            />
                          </Badge>
                        </Tooltip>
                      )}
                    </span>
                  </div>
                  <div className="loginOption absolute -top-40 right-0 z-40">
                    {!userInfor && (
                      <div className="w-44 h-max flex flex-col mb-4 pl-3 pr-2 py-5 bg-white border border-gray-200 rounded-xl hover:shadow-xl shadow-md ">
                        <span className="py-2 my-2 font-semibold hover:bg-gray-200 hover:shadow-sm hover:rounded-xl cursor-pointer">
                          <Link to="/register">Sign up</Link>
                        </span>
                        <span className="py-2 my-2 font-semibold hover:bg-gray-200 hover:shadow-sm hover:rounded-xl cursor-pointer">
                          <Link to="/login">Login</Link>
                        </span>
                      </div>
                    )}
                    {userInfor && (
                      <div className="w-44 h-max flex flex-col mb-4 pl-3 pr-2 py-5 bg-white border border-gray-200 rounded-xl hover:shadow-xl shadow-md ">
                        <span className="py-2 my-2 font-semibold hover:bg-gray-200 hover:shadow-sm hover:rounded-xl cursor-pointer">
                          <Link to={`/user/${userInfor._id}`}>
                            Personal Page
                          </Link>
                        </span>
                        <span
                          className="py-2 my-2 font-semibold hover:bg-gray-200 hover:shadow-sm hover:rounded-xl cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(Header);
