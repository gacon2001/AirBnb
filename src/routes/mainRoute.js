import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import RoomListPage from "../pages/RoomListPage/RoomListPage";
import RoomDetailPage from "./../pages/RoomDetailPage/RoomDetailPage";
import PageNotFound from "./../pages/404Page/PageNotFound";

export const mainRoutes = [
  {
    path: "/",
    element: <HomePage />,
    exact: true,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/listhotel", element: <RoomListPage /> },
  { path: "/hotel/:id", element: <RoomDetailPage /> },
  { path: "/*", element: <PageNotFound /> },
];
