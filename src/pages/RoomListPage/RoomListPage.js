import "./roomListPage.scss";
import Footer from "../../components/Footer/Footer";
import RoomList from "./../../components/RoomList/RoomList";
import NavbarFull from "../../components/Navbar/NavbarFull";
import NavbarSmall from "../../components/Navbar/NavbarSmall";
import { useRef, useState } from "react";
import useOnClickOutside from "../../HOOK/use-onclick-outside";
import Animate from "@charlesvien/react-animatecss";

export default function RoomListPage() {
  const [isNavChoose, setIsNavChoose] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setIsNavChoose(false));

  return (
    <>
      <header className="header w-full relative z-50" ref={ref}>
        {/* {!isNavChoose && (
          <NavbarSmall
            setIsNavChoose={setIsNavChoose}
            isNavChoose={isNavChoose}
          />
        )} */}
        {!isNavChoose && (
          <Animate
            animationIn="slideInDown"
            animationOut="slideOutUp"
            inDuration={300}
            outDuration={100}
            visible
          >
            <NavbarSmall
              setIsNavChoose={setIsNavChoose}
              isNavChoose={isNavChoose}
            />
          </Animate>
        )}
        {/* {isNavChoose && <NavbarFull />} */}
        {isNavChoose && (
          <Animate
            animationIn="slideInDown"
            animationOut="slideOutUp"
            outDelay={100}
            inDuration={300}
            outDuration={100}
            visible
          >
            <NavbarFull />
          </Animate>
        )}
      </header>
      <main>
        <RoomList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
