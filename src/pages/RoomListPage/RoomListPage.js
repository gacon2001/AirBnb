import "./roomListPage.scss";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RoomList from "./../../components/RoomList/RoomList";

export default function RoomListPage() {
  return (
    <>
      <header className="header">
        <Navbar type="list" />
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
