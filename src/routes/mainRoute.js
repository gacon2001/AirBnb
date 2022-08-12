import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import RoomListPage from "../pages/RoomListPage/RoomListPage";
import RoomDetailPage from "./../pages/RoomDetailPage/RoomDetailPage";
import PageNotFound from "./../pages/404Page/PageNotFound";
import LayoutTheme from "../HOC/LayoutTheme";

export const mainRoutes = [
  {
    path: "/",
    element: <HomePage />,
    exact: true,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegistrationPage /> },
  {
    path: "/listhotel/:id/:long/:lat",
    element: <LayoutTheme Element={RoomListPage} />,
    isUseLayOut: true,
  },
  {
    path: "/hotel/:id",
    element: <LayoutTheme Element={RoomDetailPage} />,
    isUseLayOut: true,
  },
  { path: "/*", element: <PageNotFound /> },
];
