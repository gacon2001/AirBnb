import React from "react";
import { dataIcon } from "./iconUtil";

export default function RoomUtil({ render }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">What this place offers</h2>
      <div className="flex flex-col h-80 flex-wrap">
        {render.kitchen && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[0].file}</span>
            <span>{dataIcon[0].name}</span>
          </div>
        )}
        {render.pool && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[1].file}</span>
            <span>{dataIcon[1].name}</span>
          </div>
        )}
        {render.elevator && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[2].file}</span>
            <span>{dataIcon[2].name}</span>
          </div>
        )}
        {render.hotTub && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[3].file}</span>
            <span>{dataIcon[3].name}</span>
          </div>
        )}
        {render.gym && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[4].file}</span>
            <span>{dataIcon[4].name}</span>
          </div>
        )}
        {render.wifi && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[5].file}</span>
            <span>{dataIcon[5].name}</span>
          </div>
        )}
        {render.cableTV && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[6].file}</span>
            <span>{dataIcon[6].name}</span>
          </div>
        )}
        {render.dryer && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[7].file}</span>
            <span>{dataIcon[7].name}</span>
          </div>
        )}
        {render.heating && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[8].file}</span>
            <span>{dataIcon[8].name}</span>
          </div>
        )}
        {render.indoorFireplace && (
          <div className="flex w-1/2 flex-row items-center py-3">
            <span className="mr-3">{dataIcon[9].file}</span>
            <span>{dataIcon[9].name}</span>
          </div>
        )}
      </div>
      <div className="mt-4 pb-3">
        <button>
          <span className="py-3 px-9 bg-white font-semibold text-sm rounded-md border border-gray-800 ">
            Show all amentities
          </span>
        </button>
      </div>
    </>
  );
}
