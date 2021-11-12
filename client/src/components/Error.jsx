import React from "react";
import { Link } from "react-router-dom";

function Error() {
	return (
		<div>
			ERROR 404 : Cannot find Page
			<br />
			<Link to="/">Back to Home</Link>
		</div>
	);
}

export default Error;