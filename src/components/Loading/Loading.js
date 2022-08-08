import React from "react";
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default function Loading() {
  return (
    <div className="w-screen h-screen relative bg-yellow-100 ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
