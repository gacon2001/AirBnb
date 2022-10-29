import Anywhere from "../../components/Anywhere/Anywhere";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Nearby from "../../components/Nearby/Nearby";
import BackToTop from "./BackToTop";
import "./homePage.scss";

export default function HomePage() {
  return (
    <>
      <header className="overflow-x-hidden">
        <Header />
      </header>
      <main className="mx-auto overflow-x-hidden">
        <Nearby />
        <Anywhere />
      </main>
      <footer className="overflow-x-hidden">
        <Footer />
      </footer>
      <div>
        <BackToTop />
      </div>
    </>
  );
}
