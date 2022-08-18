import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faLocationDot,
  faMagnifyingGlass,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../HOOK/use-onclick-outside";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge, notification, Tooltip } from "antd";
import { localStorageService } from "./../../services/localStorageService";
import { setUserLogin, setUserToken } from "../../redux/slices/userSlice";
import { locationService } from "../../services/locationService";
import {
  setSearchDateInfo,
  setSearchLocation,
  setSearchOption,
} from "../../redux/slices/searchSlice";
import Logo from "../logo/Logo";
import useWindowDimensions from "../../HOOK/useWindowDimensions";
import LogoSmall from "./../logo/LogoSmall";

export default function NavbarFull({ type }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = useRef();
  const locationRef = useRef();
  const { height, width } = useWindowDimensions();

  const [isLocation, setIsLocation] = useState(false);
  const [location, setLocation] = useState("");

  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [isGuest, setIsGuest] = useState(false);
  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    pet: 0,
  });

  const handleOption = (name, operation) => {
    setOption((option) => {
      return {
        ...option,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  //Search button and navigate to list page
  let locationInfo = useSelector((state) => state.searchSlice.locationInfo);

  const handleSearch = () => {
    let dateStringify = JSON.stringify(date);
    let dateParse = JSON.parse(dateStringify);
    // console.log("dateParse", dateParse);
    dispatch(setSearchDateInfo(dateParse));
    dispatch(setSearchOption(option));
    localStorageService.setLocationInfo(locationInfo);
    localStorageService.setDateInfo(date);
    localStorageService.setOptionInfo(option);
    navigate(`/listhotel/${locationInfo}/106.7/10.77`);
  };

  //render user avatar
  let userInfor = useSelector((state) => state.userSlice.userInfo);
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  //search debounce
  const [search, setSearch] = useState([]);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  let handleOnChange = (e) => {
    const value = e.target.value;
    // console.log("value", value);
    locationService
      .getLocation(value)
      .then((res) => {
        // console.log("res", res);
        setSearch(res.data);
        setIsLocation(!isLocation);
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  const optimisedVersion = useCallback(debounce(handleOnChange), []);

  //turn off all popup search result
  useOnClickOutside(
    ref,
    () => setIsLocation(false),
    () => setIsCheckIn(false),
    () => setIsCheckOut(false),
    () => setIsGuest(false)
  );

  //set location result to input value
  useEffect(() => {
    locationRef.current.value = location;
  }, [location]);

  let handleLogout = () => {
    openNotificationWithIcon("success", "Goodbye " + userInfor.name);
    dispatch(setUserLogin(null));
    dispatch(setUserToken(null));
    localStorageService.removeUserInfo();
    localStorageService.removeUserToken();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className={`navbar py-5 scale-90 lg:scale-100 `}>
      <div className="top grid md:grid-cols-[0.1fr,1.9fr,0.7fr,auto] lg:grid-cols-[1.0fr,1.4fr,0.7fr,auto] xl:w-[1120px] lg:w-[990px] md:w-[750px] mx-auto">
        <Link to="/">
          <div
            className={`flex items-center h-12 ${
              type === "home" ? "logoAirbnb-white" : "logoAirbnb-pink"
            }`}
          >
            {width > 1024 ? <Logo /> : <LogoSmall />}
          </div>
        </Link>
        <div className="searchChoise flex items-center h-12 mt-1 ">
          <div
            className={`${
              type === "home" ? "fontColorSmall" : "fontColorFull"
            }`}
          >
            <span className=" after:bg-gray-700 inline-block after:w-24 relative px-4 my-3 pb-2 cursor-pointer after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 after:h-[2px] after:rounded-full hover:after:w-24 active:after:w-10 ">
              Place to stay
            </span>
            {width > 1024 && (
              <span className="after:bg-gray-700 inline-block after:w-0 relative px-4 my-3 pb-2 cursor-pointer after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 after:h-[2px] after:rounded-full hover:after:w-24">
                <Link to="/experiences">Experiences</Link>
              </span>
            )}
            <span className="after:bg-gray-700 inline-block after:w-0 relative px-4 my-3 pb-2 cursor-pointer after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 after:h-[2px] after:rounded-full hover:after:w-32">
              <Link to="/online_experiences">Online Experiences</Link>
            </span>
          </div>
        </div>

        <div className="userNavbar">
          <div className="flex items-center justify-end">
            <span className=" bg-gray-100 flex items-center h-10 px-6 rounded-full font-semibold tracking-wide text-sm cursor-pointer truncate">
              <Link to="/become-host">Become a host</Link>
            </span>
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
                <span className="h-8 text-2xl ml-2 text-gray-700 ">
                  <FontAwesomeIcon icon={faBars} className="" />
                </span>
                <span className="h-10 text-4xl text-gray-700">
                  {!userInfor && (
                    <Badge dot>
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className="text-4xl text-gray-700"
                      />
                    </Badge>
                  )}
                  {userInfor && (
                    <Tooltip title={userInfor.name} placement="right">
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

              <div className="loginOption absolute top-12 right-0 z-[51]">
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

      <div className={`bottom`}>
        <div className="w-full max-w-4xl mx-auto mt-5 rounded-full bg-white shadow-md border border-gray-200 relative z-50">
          <div
            ref={ref}
            className="form grid md:grid-cols-[1fr,1fr,0.7fr,auto] lg:grid-cols-[0.8fr,1.2fr,0.7fr,auto] w-full"
          >
            <span
              role="button"
              className={`h-full relative flex justify-between rounded-full
                ${
                  isLocation
                    ? "shadow-around"
                    : "hover:bg-gray-200 hover:bg-opacity-40"
                } `}
            >
              <div className="flex flex-col px-7 items-start py-5 ">
                <span className="text-xs font-bold tracking-wider text-gray-500">
                  Location
                </span>
                <input
                  ref={locationRef}
                  type="text"
                  placeholder="Try 'Hạ Long'"
                  className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                  name={"search"}
                  onClick={() => {
                    // setIsLocation(!isLocation);
                    setIsCheckIn(false);
                    setIsCheckOut(false);
                    setIsGuest(false);
                  }}
                  onChange={optimisedVersion}
                />
              </div>
              <div className="border-r my-5 "></div>
              <div
                className={`resLocation absolute top-20 right-1/2 translate-x-1/2  ${
                  isLocation ? "" : "hidden"
                }`}
              >
                <div
                  className={`w-max h-max flex flex-col my-3 pl-3 pr-2 py-1 bg-white border border-gray-200 rounded-3xl hover:shadow-xl shadow-md ${
                    search.length ? "" : "hidden"
                  }`}
                >
                  {search?.length > 0 &&
                    search?.map((item, i) => {
                      return (
                        <span
                          className="py-1 px-2 my-1 hover:bg-gray-400 hover:bg-opacity-10 hover:shadow-sm hover:rounded-xl cursor-pointer text-sm flex items-center truncate"
                          key={i}
                          onClick={() => {
                            setLocation(item.name);
                            dispatch(setSearchLocation(item._id));
                          }}
                        >
                          <span>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className="text-xl py-2 px-3 mr-2 bg-gray-200 rounded-md border-gray-500 text-gray-700"
                            />
                          </span>
                          {search?.length
                            ? `${item.name}, ${item.province}`
                            : "Please try again or try 'Hạ Long'"}
                        </span>
                      );
                    })}
                </div>
              </div>
            </span>
            <span
              role="button"
              className=" h-full relative flex justify-between"
            >
              <div className="flex content-between flex-grow ">
                <div
                  className={`checkInDate w-1/2 flex flex-col px-7 text-left py-5 rounded-full cursor-pointer
                    ${
                      isCheckIn
                        ? "shadow-around"
                        : " hover:bg-gray-200 hover:bg-opacity-40"
                    }`}
                >
                  <span className="text-xs font-bold tracking-wider text-gray-500">
                    Check in
                  </span>
                  <span
                    className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                    onClick={() => {
                      setIsCheckIn(!isCheckIn);
                      setIsLocation(false);
                      setIsCheckOut(false);
                      setIsGuest(false);
                    }}
                  >
                    {date[0].endDate
                      ? format(date[0].startDate, "dd/MM/yyyy")
                      : "Add dates"}
                  </span>
                </div>
                <div
                  className={`checkOutDate w-1/2 flex flex-col px-7 text-left py-5  rounded-full cursor-pointer
                   ${
                     isCheckOut
                       ? "shadow-around"
                       : "hover:bg-gray-200 hover:bg-opacity-40"
                   }`}
                >
                  <span className="text-xs font-bold tracking-wider text-gray-500">
                    Check out
                  </span>
                  <span
                    className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                    onClick={() => {
                      setIsCheckOut(!isCheckOut);
                      setIsCheckIn(false);
                      setIsLocation(false);
                      setIsGuest(false);
                    }}
                  >
                    {date[0].endDate
                      ? format(date[0].endDate, "dd/MM/yyyy")
                      : "Add dates"}
                  </span>
                </div>
              </div>
              <div className="border-r my-5 "></div>
              <div
                className={`resLocation absolute top-20 right-1/2 translate-x-1/2 ${
                  isCheckIn || isCheckOut ? "" : "hidden"
                }`}
              >
                <div className=" w-max h-max flex flex-col my-3 pl-3 pr-2 py-5 bg-white border border-gray-200 rounded-3xl hover:shadow-xl shadow-md ">
                  <span className="py-1 px-2 my-2 cursor-pointer">
                    <DateRange
                      onChange={(item) => {
                        return setDate([item.selection]);
                      }}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={date}
                      direction="horizontal"
                      minDate={new Date()}
                    />
                    ;
                  </span>
                </div>
              </div>
            </span>
            <span
              role="button"
              className={`h-full relative flex justify-between rounded-full
                ${
                  isGuest
                    ? " shadow-around"
                    : "hover:bg-gray-200 hover:bg-opacity-40"
                }`}
            >
              <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-col px-7 text-left py-5 cursor-pointer">
                  <span className="text-xs font-bold tracking-wider text-gray-500">
                    Guests
                  </span>
                  {/* <input
                    type="text"
                    placeholder="Add guests"
                    className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                    onClick={() => {
                      setIsGuest(!isGuest);
                      setIsCheckOut(false);
                      setIsCheckIn(false);
                      setIsLocation(false);
                    }}
                  /> */}
                  <span
                    className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                    onClick={() => {
                      setIsGuest(!isGuest);
                      setIsCheckOut(false);
                      setIsCheckIn(false);
                      setIsLocation(false);
                    }}
                  >
                    {`${option.adult} adult - ${option.children} children - ${option.pet} pet`}
                  </span>
                </div>
                <div className=" p-2">
                  <button
                    /* type="submit" */
                    className="searchButton border p-5 flex items-center justify-center rounded-full bg-primary hover:saturate-200 text-white text-lg"
                    onClick={handleSearch}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>
              <div
                className={`resLocation absolute top-20 right-1/2 translate-x-1/2 ${
                  isGuest ? "" : "hidden"
                }`}
              >
                <div className=" w-96 h-max flex flex-col my-3 pl-3 pr-2 py-2 bg-white border border-gray-200 rounded-3xl hover:shadow-xl shadow-md ">
                  <div className="py-5 px-3 mt-1 flex items-center justify-between border-b">
                    <div className="flex flex-col text-left text-sm">
                      <span className=" font-bold tracking-wider text-gray-500">
                        Adult
                      </span>
                      <span className="w-full text-xs pt-1 text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none">
                        Ages 13 or above
                      </span>
                    </div>
                    <div className="optionAction flex items-center ">
                      <button
                        className={`text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 text-gray-700 ${
                          option.adult <= 1
                            ? "hover:border-gray-200 cursor-not-allowed"
                            : "hover:border-gray-500"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOption("adult", "d");
                        }}
                        disabled={option.adult <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{option.adult}</span>
                      <button
                        className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOption("adult", "i");
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="py-5 px-3 mt-1 flex items-center justify-between border-b">
                    <div className="flex flex-col text-left text-sm">
                      <span className=" font-bold tracking-wider text-gray-500">
                        Children
                      </span>
                      <span className="w-full text-xs pt-1 text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none">
                        Under 13
                      </span>
                    </div>
                    <div className="optionAction flex items-center ">
                      <button
                        className={`text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 text-gray-700 ${
                          option.children <= 0
                            ? "hover:border-gray-200 cursor-not-allowed"
                            : "hover:border-gray-500"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOption("children", "d");
                        }}
                        disabled={option.children <= 0}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{option.children}</span>
                      <button
                        className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOption("children", "i");
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="py-5 px-3 mt-1 flex items-center justify-between">
                    <div className="flex flex-col text-left text-sm">
                      <span className=" font-bold tracking-wider text-gray-500">
                        Pets
                      </span>
                      <span className="w-full text-xs pt-1 text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none">
                        Bringing a service animal!
                      </span>
                    </div>
                    <div className="optionAction flex items-center ">
                      <button
                        className={`text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 text-gray-700 ${
                          option.pet <= 0
                            ? "hover:border-gray-200 cursor-not-allowed"
                            : "hover:border-gray-500"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOption("pet", "d");
                        }}
                        disabled={option.pet <= 0}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{option.pet}</span>
                      <button
                        className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOption("pet", "i");
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
