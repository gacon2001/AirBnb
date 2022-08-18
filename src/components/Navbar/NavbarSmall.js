import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge, notification, Tooltip } from "antd";
import { localStorageService } from "./../../services/localStorageService";
import {
  setUserAvatar,
  setUserLogin,
  setUserToken,
} from "../../redux/slices/userSlice";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { locationService } from "./../../services/locationService";
import Logo from "../logo/Logo";
import useWindowDimensions from "../../HOOK/useWindowDimensions";
import LogoSmall from "../logo/LogoSmall";

export default function NavbarSmall({ type, setIsNavChoose, isNavChoose }) {
  let userInfor = useSelector((state) => state.userSlice.userInfo);
  let locationInfo = useSelector((state) => state.searchSlice.locationInfo);
  const [locationName, setLocationName] = useState("");
  let dateInfo = useSelector((state) => state.searchSlice.dateInfo);
  console.log("dateInfo", dateInfo);
  let option = useSelector((state) => state.searchSlice.option);
  const { height, width } = useWindowDimensions();

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    locationService
      .getRoomList(locationInfo)
      .then((res) => {
        // console.log("res", res);
        setLocationName(res.data[0].locationId.name);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [locationInfo]);

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

  return (
    <div
      className={`navbar py-5 ${type !== "home" ? "bg-white shadow-md" : ""} `}
    >
      <div
        className={`top ${
          type === "user"
            ? "flex justify-between"
            : "grid grid-cols-[0.2fr,1.8fr,1.0fr,auto]"
        } xl:w-[1120px] lg:w-[990px] md:w-[750px] mx-auto `}
      >
        <Link to="/">
          <div
            className={`flex items-center h-12 ${
              type === "home" ? "logoAirbnb-white" : "logoAirbnb-pink"
            }`}
          >
            {width > 1024 ? <Logo /> : <LogoSmall />}
          </div>
        </Link>

        <div className={`searchChoise ${type === "user" ? "hidden" : ""}`}>
          <button
            className="false pl-3 relative flex items-center h-12 pr-1 mx-auto text-left transform bg-white border border-gray-200 rounded-full shadow-md cursor-pointer min-w-[320px] hover:shadow-lg  duration-200"
            onClick={() => {
              setIsNavChoose(!isNavChoose);
            }}
          >
            <span className=" text-sm font-semibold tracking-wide text-gray-500 flex flex-row items-center">
              <span className="px-4 py-1 border-r border-gay-200 w-36 truncate inline-block">
                {locationName}
              </span>
              <span
                className={`px-4 py-1 ${
                  width > 1024 && "border-r border-gay-200"
                } w-32 inline-block`}
              >
                <span className="font-semibold ">
                  {`${format(
                    new Date(dateInfo[0].startDate),
                    "dd/MM"
                  )} - ${format(new Date(dateInfo[0].endDate), "dd/MM")}`}
                </span>
              </span>
              {width > 1024 && (
                <span className="px-4 py-1">
                  <span className="font-semibold ">{`${option.adult} adult - ${option.children} children - ${option.pet} pet`}</span>
                </span>
              )}
            </span>
            <FontAwesomeIcon
              icon={faSearch}
              className="p-3 ml-3 bg-[#ff385c] text-white rounded-full bg-primary"
            />
          </button>
        </div>

        <div className="userNavbar">
          <div className="flex items-center justify-end">
            <Link to="/become-host">
              <span className=" bg-gray-100 flex items-center h-10 px-6 rounded-full font-semibold tracking-wide text-sm cursor-pointer truncate">
                Become a host
              </span>
            </Link>
            <span className="text-gray-200 hover:bg-gray-500 hover:bg-opacity-10 flex items-center h-10 px-2 mr-1 rounded-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 100.353 100.353"
                width={25}
                height={25}
              >
                <path
                  d="M49.138,10.645c-0.256-0.007-1.32,0.002-1.381,0.004C26.786,11.064,9.829,28.113,9.567,49.121  c-0.114,0.211-0.184,0.449-0.184,0.706c0,0.266,0.075,0.511,0.196,0.727c0.498,20.8,17.359,37.607,38.179,38.018  c0.152,0.005,0.303,0.02,0.456,0.02c0.04,0,0.079-0.005,0.119-0.005c0.068,0,0.135,0.005,0.203,0.005  c21.494,0,38.98-17.486,38.98-38.981C87.517,28.319,70.355,10.97,49.138,10.645z M84.484,48.327H70.215  c-0.256-14.633-4.856-26.991-11.654-33.265C73.142,19.3,83.926,32.53,84.484,48.327z M47.036,13.706v34.621H29.213  C29.558,29.823,37.32,14.835,47.036,13.706z M47.036,51.326v34.19c-9.64-1.121-17.361-15.884-17.817-34.19H47.036z M50.036,85.423  V51.326h17.173C66.763,69.223,59.375,83.736,50.036,85.423z M50.036,48.327V13.799c9.413,1.701,16.841,16.435,17.179,34.528H50.036z   M37.555,15.35c-6.627,6.361-11.09,18.568-11.342,32.977H12.587C13.133,32.877,23.46,19.878,37.555,15.35z M12.598,51.326H26.22  c0.332,14.222,4.775,26.249,11.336,32.546C23.59,79.386,13.318,66.588,12.598,51.326z M58.561,84.16  c6.731-6.213,11.311-18.388,11.648-32.834h14.264C83.737,66.933,73.01,79.961,58.561,84.16z"
                  id="id_101"
                  style={{ fill: "rgb(175, 178, 179)" }}
                />
              </svg>
            </span>
            <div className="profile relative">
              <div className="userLoginIcon flex items-center justify-between pl-3 pr-2 py-1 bg-white border border-gray-200 rounded-full h-max hover:shadow-md cursor-pointer w-24 ">
                <span className="h-8 text-2xl ml-2 text-gray-400 ">
                  <FontAwesomeIcon icon={faBars} className="" />
                </span>
                <span className="h-10 text-4xl text-gray-400">
                  {!userInfor && <FontAwesomeIcon icon={faCircleUser} />}
                  {userInfor && (
                    <Tooltip title={userInfor.name} placement="rightTop">
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

              <div className="loginOption absolute top-12 right-0 z-40">
                {!userInfor && (
                  <div className="w-44 h-max flex flex-col mt-4 pl-3 pr-2 py-5 bg-white border border-gray-200 rounded-xl hover:shadow-xl shadow-md ">
                    <span className="py-2 my-2 font-semibold hover:bg-gray-200 hover:shadow-sm hover:rounded-xl cursor-pointer">
                      <Link to="/register">Sign up</Link>
                    </span>
                    <span className="py-2 my-2 font-semibold hover:bg-gray-200 hover:shadow-sm hover:rounded-xl cursor-pointer">
                      <Link to="/login">Login</Link>
                    </span>
                  </div>
                )}
                {userInfor && (
                  <div className="w-44 h-max flex flex-col mt-4 pl-3 pr-2 py-5 bg-white border border-gray-200 rounded-xl hover:shadow-xl shadow-md ">
                    <span className="py-2 my-2 font-semibold hover:bg-gray-200 hover:shadow-sm hover:rounded-xl cursor-pointer">
                      <Link to={`/user/${userInfor._id}`}>Personal Page</Link>
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
  );
}
