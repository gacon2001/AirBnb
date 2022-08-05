import Navbar from "../Navbar/Navbar";
import houseNearSeaside from "../../assets/home/houseNearSeaside.jpg";
import "./header.scss";
import NavbarFull from "../Navbar/NavbarFull";

export default function Header() {
  return (
    <div className="header pb-8 w-screen h-screen bg-black">
      {/* <Navbar /> */}
      <NavbarFull type="home" />
      <div className="w-[1120px] mx-auto  h-[550px] mt-7  ">
        <img
          src={houseNearSeaside}
          alt=""
          className=" w-full h-full object-cover object-center rounded-2xl"
        />
      </div>
    </div>
  );
}
