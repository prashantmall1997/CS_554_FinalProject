import React from "react";
import "../App.css";
import {
	Inject,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	ScheduleComponent,
} from "@syncfusion/ej2-react-schedule";
import { Link } from "react-router-dom";

function SchedulesPage() {
	return (
		<div className="schedules-page">
			<div className="header">
				<h1> Schedule Courses</h1>
				<Link className="profilepagelink" to="/profilepage">
					Profile Page
				</Link>
			</div>
			<br />
			<div className="schedules">
				<ScheduleComponent currentView="Month">
					<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
				</ScheduleComponent>
				<div className="footer">
					<h1> Footer</h1>
				</div>
			</div>
		</div>
	);
}

export default SchedulesPage;
