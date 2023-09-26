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
import Sliderb from "../components/Slider/Sliderb";
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
import DriverReward from "../components/Rewards/DriverReward";
import DriverDonate from "../components/Donation/DriverDonate";
import DriverSetting from "../components/Setting/DriverSetting";
import DriverProfile from "../components/Profile/DriverProfile";
import Admin from "../components/Login/Admin";
import AdminRoute from "../components/PrivateRoute/AdminRoute";
import DriverMore from "../components/More/DriverMore";
import Homeb from "../components/Home/Homeb";
import ChooseAccountb from "../components/ChooseAccount/ChooseAccountb";
import Locationb from "../components/Location/Locationb";
import ChooseBusb from "../components/ChooseBus/ChooseBusb";
import TicketDetailsb from "../components/TicketDetails/TicketDetailsb";
import Settingb from "../components/Setting/Settingb";
import Moreb from "../components/More/Moreb";
import Language from "./../components/Language/Language";

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
        path: "/language",
        element: <Language></Language>,
      },
      {
        path: "/homeb",
        element: <Homeb></Homeb>,
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
        path: "/accountb",
        element: <ChooseAccountb></ChooseAccountb>,
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
        path: "/locationb",
        element: (
          <PrivateRoute>
            <Locationb></Locationb>
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
        path: "/chooseBusb/:busNumber",
        element: (
          <PrivateRoute>
            <ChooseBusb></ChooseBusb>
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
        path: "/ticketb",
        element: (
          <PrivateRoute>
            <TicketDetailsb></TicketDetailsb>
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
        element: (
          <AdminRoute>
            <Manager></Manager>
          </AdminRoute>
        ),
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
        path: "/sliderb",
        element: <Sliderb></Sliderb>,
      },
      {
        path: "/admin",
        element: <Admin></Admin>,
      },
      {
        path: "/driverSetting",
        element: <DriverSetting></DriverSetting>,
      },
      {
        path: "/driverProfile",
        element: <DriverProfile></DriverProfile>,
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
        path: "/settingb",
        element: <Settingb></Settingb>,
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
        path: "/moreb",
        element: <Moreb></Moreb>,
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
      {
        path: "/driverDonate",
        element: <DriverDonate></DriverDonate>,
      },
      {
        path: "/driverReward",
        element: <DriverReward></DriverReward>,
      },
      {
        path: "/driverMore",
        element: <DriverMore></DriverMore>,
      },
    ],
  },
]);
