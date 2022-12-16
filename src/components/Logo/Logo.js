import React from "react";
import "./Logo.css";
import Tilt from "react-parallax-tilt";
import profLanner from "./logo_transparent_.png";
import calendar from "./Vector.svg";

const Logo = () => {
	return (
		<div className="mt4">
			<Tilt className="br5 shadow-5 ma0 Tilt center mb5">
				<img src={profLanner} alt="Logo" className="prof" />
				<img alt="logo calendar" src={calendar} />
			</Tilt>
		</div>
	);
};

export default Logo;
