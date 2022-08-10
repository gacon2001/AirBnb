import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer/Footer";
import useOnClickOutside from "../HOOK/use-onclick-outside";
import Animate from "@charlesvien/react-animatecss";
import NavbarSmall from "../components/Navbar/NavbarSmall";
import NavbarFull from "../components/Navbar/NavbarFull";
import Loading from "../components/Loading/Loading";

export default function LayoutTheme({ Element }) {
  const [isNavChoose, setIsNavChoose] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, [isLoading]);

  const ref = useRef();
  useOnClickOutside(ref, () => setIsNavChoose(false));
  return (
    <>
      {!isLoading && <Loading />}
      {isLoading && (
        <>
          <header className="header w-full relative z-50" ref={ref}>
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

          <Element />

          <footer>
            <Footer />
          </footer>
        </>
      )}
    </>
  );
}
