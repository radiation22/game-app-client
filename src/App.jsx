import { RouterProvider } from "react-router-dom";
import { router } from "./layout/Routes";
import "./App.css";
import socketIO from "socket.io-client";

function App() {
  const socket = socketIO.connect("http://localhost:5000/");
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
