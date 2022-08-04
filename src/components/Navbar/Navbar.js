import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useOnClickOutside from "../../HOOK/use-onclick-outside";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import NavbarTop from "./NavbarTop";

export default function Navbar({ type }) {
  const [isLocation, setIsLocation] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const ref = useRef();
  useOnClickOutside(
    ref,
    () => setIsLocation(false),
    () => setIsCheckIn(false),
    () => setIsCheckOut(false),
    () => setIsGuest(false)
  );

  return (
    <div
      className={`navbar py-5 ${type === "list" ? "bg-white shadow-md" : ""}`}
    >
      <NavbarTop type={type} />

      <div className={`bottom`}>
        <div className="w-[1120px] max-w-4xl mx-auto mt-5 rounded-full bg-white shadow-md border border-gray-200 relative z-30">
          <form
            ref={ref}
            action=""
            className="grid grid-cols-[0.8fr,1.2fr,0.7fr,auto] w-full"
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
                  type="text"
                  placeholder="Search Destination"
                  className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                  onClick={() => {
                    setIsLocation(!isLocation);
                    setIsCheckIn(false);
                    setIsCheckOut(false);
                    setIsGuest(false);
                  }}
                />
              </div>
              <div className="border-r my-5 "></div>
              <div
                className={`resLocation absolute top-20 right-1/2 translate-x-1/2  ${
                  isLocation ? "" : "hidden"
                }`}
              >
                <div className=" w-80 h-max flex flex-col my-3 pl-3 pr-2 py-5 bg-white border border-gray-200 rounded-3xl hover:shadow-xl shadow-md ">
                  <span className="py-1 px-2 my-2 hover:bg-gray-400 hover:bg-opacity-10 hover:shadow-sm hover:rounded-xl cursor-pointer text-sm flex items-center truncate">
                    <span>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-xl py-2 px-3 mr-2 bg-gray-200 rounded-md border-gray-500 text-gray-700"
                      />
                    </span>{" "}
                    Long Xuyên, An Giang, Province
                  </span>
                  <span className="py-1 px-2 my-2 hover:bg-gray-400 hover:bg-opacity-10 hover:shadow-sm hover:rounded-xl cursor-pointer text-sm flex items-center truncate">
                    <span>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-xl py-2 px-3 mr-2 bg-gray-200 rounded-md border-gray-500 text-gray-700"
                      />
                    </span>{" "}
                    Long Xuyên, An Giang, Province
                  </span>
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
                      onChange={(item) => setDate([item.selection])}
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
              className={`h-full relative flex justify-between  rounded-full
                ${
                  isGuest
                    ? " shadow-around"
                    : "hover:bg-gray-200 hover:bg-opacity-40"
                }`}
            >
              <div className="flex items-start">
                <div className="flex flex-col px-7 text-left py-5 cursor-pointer">
                  <span className="text-xs font-bold tracking-wider text-gray-500">
                    Guests
                  </span>
                  <input
                    type="text"
                    placeholder="Add guests"
                    className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                    onClick={() => {
                      setIsGuest(!isGuest);
                      setIsCheckOut(false);
                      setIsCheckIn(false);
                      setIsLocation(false);
                    }}
                  />
                </div>
                <div className="p-2">
                  <button
                    type="submit"
                    className="searchButton w-5 h-5 border p-7 flex items-center justify-center rounded-full bg-primary hover:saturate-200 text-white text-lg"
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
                      <button className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>1</span>
                      <button className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700">
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
                      <button className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>1</span>
                      <button className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700">
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
                      <button className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>1</span>
                      <button className="text-lg py-1 px-[11px] mx-3 rounded-full border border-gray-200 hover:border-gray-500 text-gray-700">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
