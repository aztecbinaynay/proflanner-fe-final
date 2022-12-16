import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({imageUrl}) => {
	return (
		<div className="center mt3">
			<img src={imageUrl} alt="" srcset="" />
		</div>
	);
};

export default FaceRecognition;
