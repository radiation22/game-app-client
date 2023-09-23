import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Root from "./Root";
import StartPage from "../components/StartPage/StartPage";
import Location from "../components/Location/Location";
import ChooseBus from "../components/ChooseBus/ChooseBus";
import TicketDetails from "../components/TicketDetails/TicketDetails";
import Delivered from "../components/Dashboard/Delivered";
import Supervisor1 from "./../components/Dashboard/Supervisor1";
import Manager from "../components/Dashboard/Manager";
import Login from "../components/Login/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import ChooseAccount from "../components/ChooseAccount/ChooseAccount";
import Login2 from "../components/Login/Login2";
import DriverRoute from "../components/PrivateRoute/DriverRoute";
import TicketInfo from "../components/UserTicket/TicketInfo";
import SuperTicket from "../components/Dashboard/SuperTicket";
import ShowTicket from "../components/UserTicket/ShowTicket";
import Slider from "../components/Slider/Slider";
import Donation from "../components/Donation/Donation";
import Rewards from "../components/Rewards/Rewards";
import Profile from "../components/Profile/Profile";
import Setting from "../components/Setting/Setting";
import Message from "../components/Message/Message";
import More from "../components/More/More";
import Inbox from "../components/Message/Inbox";
import UserWelcome from "../components/Login/UserWelcome";
import Register from "../components/Login/Register";
import Notification from "../components/Notification/Notification";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,

    // errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <StartPage></StartPage>,
      },
      {
        path: "/home",
        element: <Main></Main>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/account",
        element: <ChooseAccount></ChooseAccount>,
      },
      {
        path: "/location",
        element: (
          <PrivateRoute>
            <Location></Location>
          </PrivateRoute>
        ),
      },
      {
        path: "/chooseBus/:busNumber",
        element: (
          <PrivateRoute>
            <ChooseBus></ChooseBus>
          </PrivateRoute>
        ),
      },
      {
        path: "/ticket",
        element: (
          <PrivateRoute>
            <TicketDetails></TicketDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <DriverRoute>
            <Supervisor1></Supervisor1>
          </DriverRoute>
        ),
      },
      {
        path: "/deliver",
        element: <Delivered></Delivered>,
      },
      {
        path: "/manager",
        element: <Manager></Manager>,
      },
      {
        path: "/myTicket",
        element: (
          <PrivateRoute>
            <TicketInfo></TicketInfo>
          </PrivateRoute>
        ),
      },
      {
        path: "/trip",
        element: <SuperTicket></SuperTicket>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/login2",
        element: <Login2></Login2>,
      },
      {
        path: "/ticket/:id",
        element: <ShowTicket></ShowTicket>,
      },
      {
        path: "/slider",
        element: <Slider></Slider>,
      },
      {
        path: "/donation",
        element: (
          <PrivateRoute>
            <Donation></Donation>
          </PrivateRoute>
        ),
      },
      {
        path: "/rewards",
        element: (
          <PrivateRoute>
            <Rewards></Rewards>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/setting",
        element: <Setting></Setting>,
      },
      {
        path: "/message",
        element: <Message></Message>,
      },
      {
        path: "/more",
        element: <More></More>,
      },
      {
        path: "/inbox",
        element: <Inbox></Inbox>,
      },
      {
        path: "/welcome",
        element: <UserWelcome></UserWelcome>,
      },
      {
        path: "/notification",
        element: <Notification></Notification>,
      },
    ],
  },
]);
