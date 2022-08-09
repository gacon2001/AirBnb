import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./app.scss";
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
