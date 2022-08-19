import "./roomList.scss";
import RoomListItem from "./RoomListItem";
import SimpleBarReact from "simplebar-react";
import MapDetail from "./MapDetail";
import useWindowDimensions from "../../HOOK/useWindowDimensions";

export default function RoomList({ list, placeName, longitude, latitude }) {
  const { height, width } = useWindowDimensions();
  return (
    <div className="roomList flex">
      <div className={`left ${width > 1024 ? "w-2/3" : "w-full"} h-screen p-6`}>
        <div className="w-full h-full flex flex-col">
          <div className="roomTitle text-left pt-4 border-b">
            <span className="inline-block mb-2 text-sm text-gray-400">
              {`${list.length} stays`}
            </span>
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl lg:text-4xl lg:mb-7">
              {`Stays in ${placeName}`}
            </h2>
            <div className="option mb-4 space-x-1 space-y-2 text-gray-400 md:space-x-2 lg:mb-8">
              {[
                "Cancellation flexibility",
                "Type of place",
                "Price",
                "Instant Book",
                "More filter",
              ].map((item, i) => {
                return (
                  <span
                    key={i}
                    className="px-2 py-1 inline-block text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500"
                  >
                    {item}
                  </span>
                );
              })}
            </div>
            <p className="mb-4 text-sm text-gray-400">
              Review COVID-19 travel restrictions before you book.{" "}
              <span className="underline hover:text-gray-600 cursor-pointer">
                Learn more
              </span>
            </p>
          </div>
          <div className="roomItem">
            <SimpleBarReact style={{ maxHeight: "690px" }}>
              <RoomListItem list={list} />
            </SimpleBarReact>
          </div>
        </div>
      </div>
      {width > 1024 && (
        <div className="right w-1/3 h-screen ">
          <div className="w-full h-full cursor-grab touch-none select-none outline-none">
            <MapDetail longitude={longitude} latitude={latitude} />
          </div>
        </div>
      )}
    </div>
  );
}
