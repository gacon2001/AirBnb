import React from "react";
import { dataIcon } from "./iconUtil";

export default function RoomUtil() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">What this place offers</h2>
      <div className="flex flex-col h-80 flex-wrap">
        {dataIcon.map((item, i) => {
          return (
            <div className="flex w-1/2 flex-row items-center py-3" key={i}>
              <span className="mr-3">{item.file}</span>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pb-3">
        <button>
          <span className="py-3 px-9 bg-white font-semibold text-sm rounded-md border border-gray-800 ">
            Show all 29 amentities
          </span>
        </button>
      </div>
    </>
  );
}
