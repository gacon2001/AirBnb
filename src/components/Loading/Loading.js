import React from "react";
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default function Loading({ type }) {
  return (
    <div className="w-screen h-screen relative bg-yellow-100 ">
      <div
        className={`absolute ${
          type === "detail" ? "top-1/3" : "top-1/2"
        } left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-100`}
      >
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets4.lottiefiles.com/packages/lf20_swnrn2oy.json"
          style={{ width: "500px" }}
        ></lottie-player>
      </div>
    </div>
  );
}
