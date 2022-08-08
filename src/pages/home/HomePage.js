import Anywhere from "../../components/Anywhere/Anywhere";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Nearby from "../../components/Nearby/Nearby";
import "./homePage.scss";

export default function HomePage() {
  return (
    <>
      <header className="overflow-hidden">
        <Header />
      </header>
      <main>
        <Nearby />
        <Anywhere />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
