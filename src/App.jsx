import { RouterProvider } from "react-router-dom";
import { router } from "./layout/Routes";
import "./fonts/Nexa-Black.woff";
import "./App.css";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
