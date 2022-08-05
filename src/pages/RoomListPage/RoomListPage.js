import "./roomListPage.scss";
import Footer from "../../components/Footer/Footer";
import RoomList from "./../../components/RoomList/RoomList";
import NavbarFull from "../../components/Navbar/NavbarFull";
import NavbarSmall from "../../components/Navbar/NavbarSmall";
import { useRef, useState } from "react";
import useOnClickOutside from "../../HOOK/use-onclick-outside";
// import { useTransition, animated } from "react-spring";

export default function RoomListPage() {
  const [isNavChoose, setIsNavChoose] = useState(false);
  /*   const transition = useTransition(isNavChoose, {
    from: { x: 0, y: -200, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: -200, opacity: 0 },
  }); */

  const ref = useRef();
  useOnClickOutside(ref, () => setIsNavChoose(false));

  return (
    <>
      <header className="header w-full" ref={ref}>
        {!isNavChoose && (
          <NavbarSmall
            setIsNavChoose={setIsNavChoose}
            isNavChoose={isNavChoose}
          />
        )}
        {isNavChoose && <NavbarFull />}
        {/* {transition((style, item) => {
          return item ? (
            <animated.div style={style}>
              <NavbarFull />
            </animated.div>
          ) : (
            ""
          );
        })} */}
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
