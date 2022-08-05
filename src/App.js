import "./App.css";
import "./app.scss";
import HomePage from "./pages/home/HomePage";
import RoomDetailPage from "./pages/RoomDetailPage/RoomDetailPage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <RoomListPage />
      {/* <RoomDetailPage /> */}
    </div>
  );
}

export default App;
