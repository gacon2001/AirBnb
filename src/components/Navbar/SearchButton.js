import "./navbar.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoSmall from "../logo/LogoSmall";
import { Button, Drawer, Space } from "antd";
import { dataNearby } from "../Nearby/dataNearby";
import { useDispatch } from "react-redux";
import { setSearchLocation } from "../../redux/slices/searchSlice";

export default function SearchButton({ type }) {
  let dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div className={`navbar py-5`}>
        <div className={`w-[400px] sm:w-[500px] top mx-auto`}>
          <div className={`searchChoise flex flex-row justify-between`}>
            <div className="block mr-4">
              <Link to="/">
                <div
                  className={`flex items-center h-12 ${
                    type === "home" ? "logoAirbnb-white" : "logoAirbnb-pink"
                  }`}
                >
                  <LogoSmall />
                </div>
              </Link>
            </div>
            <button
              className="false pl-3 relative flex items-center h-12 pr-1 mx-auto text-left transform bg-white border border-gray-200 rounded-full shadow-md cursor-pointer min-w-[320px] w-full hover:shadow-lg  duration-200"
              onClick={showDrawer}
            >
              <span className=" text-sm font-semibold tracking-wide text-gray-500 mx-auto">
                <span className="px-4 py-1 w-5 truncate">
                  Where are you going?
                </span>
              </span>
              <FontAwesomeIcon
                icon={faSearch}
                className="p-3 ml-3 bg-[#ff385c] text-white rounded-full bg-primary"
              />
            </button>
          </div>
        </div>
      </div>
      <Drawer
        title={
          <span className="text-lg font-semibold">Where are you going?</span>
        }
        closable={true}
        placement="right"
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button
              onClick={onClose}
              className="px-5 bg-white border h-max border-gray-200 rounded-full shadow-md cursor-pointer hover:shadow-lg duration-200 text-sm lg:text-base font-medium text-gray-500"
            >
              <Link to={`/listhotel/6276ad9ffee2fc001cdd4044/106.66667/10.75 `}>
                Let's go
              </Link>
            </Button>
          </Space>
        }
      >
        <div>
          <div className="grid grid-cols-1 gap-x-1 gap-y-2">
            {dataNearby.map((item, i) => {
              return (
                <Link
                  to={`/listhotel/${item._id}/${item.long}/${item.lat}`}
                  key={i}
                >
                  <div
                    className="flex-row items-start md:items-center flex p-2 duration-300 md:p-3 gap-x-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl hover:scale-105"
                    onClick={() => {
                      dispatch(setSearchLocation(item._id));
                    }}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img src={item.src} alt="" />
                    </div>
                    <div className="mt-2 md:mt-0 text-left">
                      <h3 className="text-sm lg:text-base font-medium text-gray-500">
                        {item.name}
                      </h3>
                      <span className="text-sm lg:text-base text-gray-300">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
}
