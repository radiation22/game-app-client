import React, { useState, useEffect } from "react";

function PreventNavigate({ children }) {
  const [exitConfirmed, setExitConfirmed] = useState(false);

  useEffect(() => {
    let backPressed = false;
    const backButtonHandler = () => {
      if (backPressed) {
        // Exit the app or navigate to the home screen
        window.close(); // This might work for some browsers
        // Alternatively, you can implement your own logic to handle app exit.
      } else {
        // Show a message to confirm exit
        setExitConfirmed(true);
        backPressed = true;

        // Reset the confirmation after 2 seconds
        setTimeout(() => {
          backPressed = false;
          setExitConfirmed(false);
        }, 1000);
      }
    };

    window.addEventListener("popstate", backButtonHandler);

    return () => {
      window.removeEventListener("popstate", backButtonHandler);
    };
  }, []);

  return children;
}

export default PreventNavigate;
