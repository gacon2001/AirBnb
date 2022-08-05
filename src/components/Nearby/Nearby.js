import React from "react";
import { dataNearby } from "./dataNearby";

export default function Nearby() {
  return (
    <div className="nearby ">
      <div className="w-[1120px] mx-auto my-10 text-left">
        <h2 className="mb-4 text-2xl font-bold md:mb-4 lg:mb-8 md:text-3xl lg:text-4xl">
          Explore Nearby
        </h2>
        <div className="grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
          {dataNearby.map((item) => {
            return (
              <>
                <a href="/">
                  <div className="flex-col items-start md:items-center flex  p-2 duration-300 md:flex-row md:p-3 gap-x-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl hover:scale-105">
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
                </a>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
