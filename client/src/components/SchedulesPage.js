import React, { useState, useEffect } from "react";
import "../App.css";
// import axios from "axios";
// import {
// 	Inject,
// 	Day,
// 	Week,
// 	WorkWeek,
// 	Month,
// 	Agenda,
// 	ScheduleComponent,
// 	EventSettingsModel,
// } from "@syncfusion/ej2-react-schedule";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import stevenscardlogo from "../img/stevenslogo.png";
//import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from "react-bootstrap/Dropdown";

import Paper from "@material-ui/core/Paper";
import {
	Scheduler,
	WeekView,
	Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import appointments from "./testdata1";
import { readAllUsers } from "../utils/api/apis/userApi";
// function MediaCard() {
// 	return (

// 	);
// }

function SchedulesPage() {
	// const [checked, setChecked] = useState(""); for close and cancelled butttons
	const [classesData, setClassesData] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");

	// const schedulerData = [
	// 	{
	// 		startDate: "2021-12-15T09:45",
	// 		endDate: "2021-12-15T11:00",
	// 		title: "CS 554",
	// 	},
	// 	{
	// 		startDate: "2021-12-15T12:00",
	// 		endDate: "2021-12-15T13:30",
	// 		title: "Go Home",
	// 	},
	// ];

	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			const { data } = await axios.get("http://localhost:4000/classes");

	// 			if (data.length === 0 || data === undefined) {
	// 				setError(true);
	// 			} else {
	// 				setClassesData(data);
	// 			}
	// 			console.log(data);
	// 			setLoading(false);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	fetchData();
	// }, []);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await readAllUsers();
				console.log(data);
				for (let i in data) {
					if (i.schedules === undefined) {
						console.log("schedules data empty");
					}
				}
				if (data.length === 0 || data === undefined) {
					setError(true);
				} else {
					setClassesData(data);
				}
				console.log(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div className="schedules-page">
				<div className="header">
					<h1> Schedule Courses</h1>
					<Link className="profilepagelink" to="/profilepage">
						Profile Page
					</Link>{" "}
					<Link className="profilepagelink" to="/createschedule">
						Create New Schedule
					</Link>
					{/* username and CWID is to be added , need to call the parser function for timing from create schedule */}
				</div>
				<br />
				<div>
					<div className="schedules-view">
						{/* <ScheduleComponent
							data={schedulerData}
							className="schedules-view"
							currentView="Week"
						>
							<Inject
								data={schedulerData}
								services={[Day, Week, WorkWeek, Month, Agenda]}
							/>
						</ScheduleComponent> */}
						<Paper>
							<Scheduler data={appointments} height={600}>
								<WeekView startDayHour={9} endDayHour={22} />
								<Appointments />
							</Scheduler>
						</Paper>
					</div>
					<div className="schedules-sidenav">
						<Card sx={{ maxWidth: 350 }}>
							<CardMedia
								component="img"
								height="150"
								width="250"
								image={stevenscardlogo}
								alt="stevens logo"
							/>

							<CardContent>
								<p>Term</p>
								<Dropdown>
									<Dropdown.Toggle variant="success">
										Select Term
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item href="#">Spring 2021</Dropdown.Item>
										<Dropdown.Item href="#">Fall 2021</Dropdown.Item>
										<Dropdown.Item href="#">Spring 2022</Dropdown.Item>
										<Dropdown.Item href="#">And more terms...</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<p>Courses</p>
								<Dropdown>
									<Dropdown.Toggle variant="success">
										Select Courses
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item href="#">CS 546</Dropdown.Item>
										<Dropdown.Item href="#">CS 555</Dropdown.Item>
										<Dropdown.Item href="#">CS 545</Dropdown.Item>
										<Dropdown.Item href="#">CS 554</Dropdown.Item>
										<Dropdown.Item href="#">CS 570</Dropdown.Item>
										<Dropdown.Item href="#">CS 561</Dropdown.Item>
										<Dropdown.Item href="#">And more courses...</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<br />
								<CardActions>
									<input type="checkbox" id="scales" name="scales" />
									<label for="scales">Closed</label>
									<input type="checkbox" id="scales" name="scales" />
									<label for="scales">Cancelled</label>
								</CardActions>
								<p>Version 2.0 Copyright ©2021 Fantastic Five</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}
export default SchedulesPage;
