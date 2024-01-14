import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Root from "./Root";
import StartPage from "../components/StartPage/StartPage";
import Login from "../components/Login/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Slider from "../components/Slider/Slider";
import Sliderb from "../components/Slider/Sliderb";
import Profile from "../components/Profile/Profile";
import Register from "../components/Login/Register";
import Admin from "../components/Login/Admin";

import Loginb from "../components/Login/Loginb";

import Notfound from "../components/Notfound/Notfound";
import AppHome from "../components/AppHome/AppHome";
import AfterLogin from "../components/AfterLogin/AfterLogin";
import Recordvideo from "../components/Levelslide/Recordvideo";
import Videos from "../components/Test/Videos";
import Setting from "./../components/Setting/Setting";
import Orders from "../components/Orders/Orders";
import UserWelcome from "../components/Login/UserWelcome";
import MyProfile from "../components/MyProfile/MyProfile";
import SingleUser from "../components/SingleUser/SingleUser";
import Buy from "../components/ShopingSlide/Buy";
import Earn from "../components/Earn/Earn";
import AddLevel from "../components/AddItem/AddLevel";
import AddShoping from "../components/AddItem/AddShoping";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,

    errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <StartPage></StartPage>,
      },
      {
        path: "/appHome",
        element: <AppHome></AppHome>,
      },
      {
        path: "/singleProfile/:email",
        element: <SingleUser></SingleUser>,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
      {
        path: "/addLevel",
        element: <AddLevel></AddLevel>,
      },
      {
        path: "/addFood",
        element: <AddShoping></AddShoping>,
      },
      {
        path: "/myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/welcome",
        element: <UserWelcome></UserWelcome>,
      },
      {
        path: "/buy",
        element: <Buy></Buy>,
      },
      {
        path: "/earn",
        element: <Earn></Earn>,
      },
      {
        path: "/recorder/:slNo",
        element: (
          <PrivateRoute>
            <Recordvideo></Recordvideo>
          </PrivateRoute>
        ),
      },
      {
        path: "/test",
        element: <Videos></Videos>,
      },
      {
        path: "/afterLogin",
        element: <AfterLogin></AfterLogin>,
      },

      {
        path: "/home",
        element: <Main></Main>,
      },
      {
        path: "/setting",
        element: <Setting></Setting>,
      },

      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/loginb",
        element: <Loginb></Loginb>,
      },

      {
        path: "/slider",
        element: <Slider></Slider>,
      },
      {
        path: "/sliderb",
        element: <Sliderb></Sliderb>,
      },
      {
        path: "/admin",
        element: <Admin></Admin>,
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
