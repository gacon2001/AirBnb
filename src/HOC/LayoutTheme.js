import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer/Footer";
import useOnClickOutside from "../HOOK/use-onclick-outside";
import Animate from "@charlesvien/react-animatecss";
import NavbarSmall from "../components/Navbar/NavbarSmall";
import NavbarFull from "../components/Navbar/NavbarFull";
import Loading from "../components/Loading/Loading";
import useWindowDimensions from "../HOOK/useWindowDimensions";
import SearchButton from "../components/Navbar/SearchButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoSmall from "../components/logo/LogoSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Badge, notification, Tooltip } from "antd";
import {
  setUserAvatar,
  setUserLogin,
  setUserToken,
} from "../redux/slices/userSlice";
import { localStorageService } from "../services/localStorageService";

export default function LayoutTheme({ Element }) {
  const [isNavChoose, setIsNavChoose] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { height, width } = useWindowDimensions();
  // console.log("width, height", width, height);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let userInfor = useSelector((state) => state.userSlice.userInfo);

  useEffect(() => {
    let timeId = setTimeout(() => {
      setIsLoading(true);
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

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

  const ref = useRef();
  useOnClickOutside(ref, () => setIsNavChoose(false));
  return (
    <>
      {!isLoading && <Loading />}
      {isLoading && (
        <>
          <header className="header w-full relative z-[100] shadow" ref={ref}>
            {width < 768 ? (
              <SearchButton type={"layout"} />
            ) : !isNavChoose ? (
              <Animate
                animationIn="slideInDown"
                animationOut="slideOutUp"
                inDuration={300}
                outDuration={100}
                visible
              >
                <NavbarSmall
                  setIsNavChoose={setIsNavChoose}
                  isNavChoose={isNavChoose}
                />
              </Animate>
            ) : (
              <Animate
                animationIn="slideInDown"
                animationOut="slideOutUp"
                outDelay={100}
                inDuration={300}
                outDuration={100}
                visible
              >
                <NavbarFull />
              </Animate>
            )}
            {width < 768 && (
              <div className="w-full bg-white border-t border-gray-300 shadow-md fixed bottom-0 z-40 rounded-t-lg ">
                <div className="w-[300px] mx-auto flex flex-row items-center justify-between">
                  <div className="logo">
                    <Link to="/">
                      <div className={`flex items-center h-12 text-[#ff385c]`}>
                        <LogoSmall />
                      </div>
                    </Link>
                  </div>
                  <div className="explore">
                    <div className=" px-3 py-2 bg-white border border-gray-200 rounded-full h-max hover:shadow-md cursor-pointer text-[#ff385c]">
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
                            {!userInfor && (
                              <FontAwesomeIcon icon={faCircleUser} />
                            )}
                            {userInfor && (
                              <Tooltip
                                title={userInfor.name}
                                placement="rightTop"
                              >
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
          </header>

          <Element />

          <footer className="overflow-hidden">
            <Footer />
          </footer>
        </>
      )}
    </>
  );
}
