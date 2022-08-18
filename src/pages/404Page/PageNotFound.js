import React from "react";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { Link } from "react-router-dom";
import Logo from "../../components/logo/Logo";
// import Loading from "../../components/Loading/Loading";

export default function PageNotFound() {
  return (
    <div>
      {/* <Loading /> */}

      <div className="w-screen h-screen relative bg-white flex items-center justify-center">
        <Link to="/">
          <div className="logo absolute top-10 left-10 w-max h-max text-[#ff385c] cursor-pointer">
            <Logo />
          </div>
        </Link>
        <div className="md:scale-110 lg:scale-150">
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://assets6.lottiefiles.com/packages/lf20_rz0hyab1.json"
            style={{ width: "500px" }}
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}
