// import { Fancybox } from "@fancyapps/ui/dist/fancybox.esm";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useWindowDimensions from "../../HOOK/useWindowDimensions";
import Fancybox from "./../../HOOK/Fancybox";

export default function GalleryImg({ pic }) {
  const { height, width } = useWindowDimensions();
  return (
    <div className="relative w-full h-full">
      <div
        className={`grid ${
          width < 680 ? "grid-rows-2 grid-cols-2" : "grid-rows-2 grid-cols-4"
        } gap-2 rounded-lg overflow-hidden w-full h-full`}
      >
        <Fancybox options={{ infinite: false }}>
          <div
            className={`${
              width < 680 ? "" : "col-span-2 row-span-2"
            } w-full h-full hover:bg-black hover:opacity-90 duration-200 cursor-pointer`}
          >
            <img
              data-fancybox="gallery"
              src={pic}
              data-src={pic}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div
            className={`w-full h-full hover:bg-black hover:opacity-90 duration-200 cursor-pointer`}
          >
            <img
              data-fancybox="gallery"
              src="https://a0.muscache.com/im/pictures/768b69ce-7c89-447b-9db3-6d148c86cfe8.jpg?im_w=720"
              data-src="https://a0.muscache.com/im/pictures/768b69ce-7c89-447b-9db3-6d148c86cfe8.jpg?im_w=720"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="w-full h-full hover:bg-black hover:opacity-90 duration-200 cursor-pointer">
            <img
              data-fancybox="gallery"
              src="https://a0.muscache.com/im/pictures/f942767a-c81d-413a-ab3a-31cc698c7d16.jpg?im_w=720"
              data-src="https://a0.muscache.com/im/pictures/f942767a-c81d-413a-ab3a-31cc698c7d16.jpg?im_w=720"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="w-full h-full hover:bg-black hover:opacity-90 duration-200 cursor-pointer">
            <img
              data-fancybox="gallery"
              src="https://a0.muscache.com/im/pictures/8622324a-b25f-45a4-ae2f-129bec8f5b80.jpg?im_w=720"
              data-src="https://a0.muscache.com/im/pictures/8622324a-b25f-45a4-ae2f-129bec8f5b80.jpg?im_w=720"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div
            className={`w-full h-full hover:bg-black hover:opacity-90 duration-200 cursor-pointer ${
              width < 680 && "hidden"
            }`}
          >
            <img
              data-fancybox="gallery"
              src="https://a0.muscache.com/im/pictures/a65cacde-5681-4df0-8223-6d4f9eba4317.jpg?im_w=720"
              data-src="https://a0.muscache.com/im/pictures/a65cacde-5681-4df0-8223-6d4f9eba4317.jpg?im_w=720"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Fancybox>
      </div>

      <div className="absolute right-3 bottom-5 scale-90 lg:scale-100">
        <button>
          <span className="py-3 px-9 bg-white font-semibold text-sm rounded-md border border-gray-800 ">
            <FontAwesomeIcon icon={faTh} className="text-gray-500 mr-2" />
            Show All Photos
          </span>
        </button>
      </div>
    </div>
  );
}
