import { RouterProvider } from "react-router-dom";
import { router } from "./layout/Routes";
import "./App.css";
import socketIO from "socket.io-client";
import PreventNavigate from "./components/PreventNavigate/PreventNavigate";

function App() {
  // const socket = socketIO.connect("https://nirapode-server.vercel.app");
  return (
    <>
      <PreventNavigate>
        <RouterProvider router={router} />
      </PreventNavigate>
    </>
  );
}

export default App;
