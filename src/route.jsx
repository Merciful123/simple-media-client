
import { useRoutes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Feeds from "./components/Feed";
import Users from "./components/Users";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Posts from "./components/Posts";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <NavBar />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/feeds",
      element: <Feeds />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/followers",
      element: <Followers />,
    },
    {
      path: "/Following",
      element: <Following />,
    },
    {
      path: "/posts",
      element: <Posts />,
    },
  ]);
  return elements;
};
