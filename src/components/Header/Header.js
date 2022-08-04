import Navbar from "../Navbar/Navbar";
import houseNearSeaside from "../../assets/home/houseNearSeaside.jpg";
import "./header.scss";

export default function Header() {
  return (
    <div className="header pb-8 w-screen h-screen bg-black">
      <Navbar />
      <div className="container mx-auto w-full h-[550px] mt-7 px-12 ">
        <img
          src={houseNearSeaside}
          alt=""
          className=" w-full h-full object-cover object-center rounded-2xl"
        />
      </div>
    </div>
  );
}
