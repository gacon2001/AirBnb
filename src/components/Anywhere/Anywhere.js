import React, { memo } from "react";
import { dataAnywhere } from "./dataAnyWhere";
import { Link } from "react-router-dom";

function Anywhere() {
  return (
    <div className="anyWhere">
      <div className="w-full px-3 xl:w-[1120px] mx-auto my-14 text-left">
        <h2 className="mb-4 text-3xl font-bold md:mb-4 lg:mb-8 md:text-3xl lg:text-4xl">
          Live Anywhere
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 ">
          {dataAnywhere.map((item, i) => {
            return (
              <Link to="/somewhere" key={i}>
                <div className="py-2 px-8 md:px-5 duration-300 lg:p-3 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl hover:scale-105  ">
                  <div className=" w-52 h-52 sm:h-52 sm:w-52 mb-2 overflow-hidden rounded-xl">
                    <div className="block overflow-hidden box-border object-cover object-center">
                      <img
                        src={item.src}
                        alt=""
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium leading-5 text-gray-700 text-xl md:text-xl">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(Anywhere);
