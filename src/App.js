import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./app.scss";
import PageNotFound from "./pages/404Page/PageNotFound";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import RoomDetailPage from "./pages/RoomDetailPage/RoomDetailPage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
import { mainRoutes } from "./routes/mainRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {mainRoutes.map((route, i) => {
            if (route.isUseLayOut) {
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={route.element}
                  exact={route.exact}
                />
              );
            }
            return (
              <Route
                key={i}
                path={route.path}
                element={route.element}
                exact={route.exact}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
