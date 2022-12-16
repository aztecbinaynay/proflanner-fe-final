import React from "react";
import "./ImageLinkForm.css";

// this component receives a propr from App.js so instead of using props.onInputChange, we can use onInputChange directly
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className="p" style={{ color: "white" }}>
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
			</p>
			<div className="center pa3 br3 shadow-5 form pattern mt3">
				{/* we will use the onChange attribute of inputs to detect changes in the input */}
				<input
					type="text"
					className="f4 pa2 w-70 center"
					onChange={onInputChange}
				/>
				{/* we will use the onClick attribute of button to detect clicks */}
				<button
					className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
					onClick={onButtonSubmit}
				>
					Detect
				</button>
			</div>
		</div>
	);
};

export default ImageLinkForm;
