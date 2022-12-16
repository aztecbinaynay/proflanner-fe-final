import "./MetaData.css";
import "tachyons";

const MetaData = ({ coursesToOpen, filteredcourses }) => {
	console.log(filteredcourses);
	const { course, gradingsem, gradingyear, labhrs, lechrs, modularity } =
		filteredcourses[0];

	return (
		<div>
			<div>
				<h1 className="mb0">TECHNOLOGICAL INSTITUTE OF THE PHILIPPINES</h1>
				<h1 className="mt1">
					<b>LESSON PLANNER</b>
				</h1>
			</div>
			<div style={{ display: "flex", justifyContent: "flex-end" }}>
				<div className="metadata pr0">
					<p>Course</p>
					<p>
						<u>{course}</u>
					</p>
					<p>Grading Sem</p>
					<p>
						<u>{gradingsem}</u>
					</p>
					<p>Grading Year</p>
					<p>
						<u>{gradingyear}</u>
					</p>
					<p>Lab hours</p>
					<p>
						<u>{labhrs}</u>
					</p>
					<p>Lec. hours</p>
					<p>
						<u>{lechrs}</u>
					</p>
					<p>Modularity</p>
					<p>
						{modularity === "modular" ? (
							<u>modular - 6 weeks</u>
						) : (
							<u>full - 18 weeks</u>
						)}
					</p>
				</div>
			</div>
			<br />
		</div>
	);
};

export default MetaData;
