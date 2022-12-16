import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
		if (isSignedIn) {return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        { route === "planner" &&
        <p
          onClick={() => onRouteChange("home")}
          className="link dim black underline pa3 pointer"
        >
          Dashboard
        </p>}
        <p
          onClick={() => onRouteChange("signin")}
          className="link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
    } else {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("signin")}
            className="link dim black underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="link dim black underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      );
    }
  
};

export default Navigation;
