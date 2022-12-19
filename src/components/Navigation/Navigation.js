import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
		if (isSignedIn) {return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        { route === "planner" &&
        <p
        style={{color: "#dd1818"}}
          onClick={() => onRouteChange("home")}
          className="link dim underline pa3 pointer"
        >
          Dashboard
        </p>}
        <p
        style={{color: "#dd1818"}}
          onClick={() => onRouteChange("signin")}
          className="link dim underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
    } else {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
          style={{color: "#dd1818"}}
            onClick={() => onRouteChange("signin")}
            className="link dim underline pa3 pointer"
          >
            Sign In
          </p>
          <p
          style={{color: "#dd1818"}}
            onClick={() => onRouteChange("register")}
            className="link dim underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      );
    }
  
};

export default Navigation;
