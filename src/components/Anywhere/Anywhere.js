import React from "react";
import { dataAnywhere } from "./dataAnyWhere";

export default function Anywhere() {
  return (
    <div className="nearby ">
      <div className="container mx-auto my-14 text-left">
        <h2 className="mb-4 text-2xl font-bold md:mb-4 lg:mb-8 md:text-3xl lg:text-4xl">
          Live Anywhere
        </h2>
        <div className="grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 lg:grid-cols-4">
          {dataAnywhere.map((item) => {
            return (
              <>
                <a href="/">
                  <div className="p-2 duration-300 lg:p-3 gap-y-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl">
                    <div className=" w-full h-40 mb-2 md:h-60 lg:h-80 overflow-hidden rounded-xl">
                      <div className="block overflow-hidden box-border">
                        <img
                          src={item.src}
                          alt=""
                          className="w-full h-full object-center"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium leading-5 text-gray-700 text-md md:text-xl">
                        {item.name}
                      </h3>
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
