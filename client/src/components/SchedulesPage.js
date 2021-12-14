import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import stevenscardlogo from "../img/stevenslogo.png";

// function MediaCard() {
// 	return (

// 	);
// }

function SchedulesPage() {
	// const [checked, setChecked] = useState(""); for close and cancelled butttons
	const [classesData, setClassesData] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await axios.get("http://localhost:4000/classes");

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
					</Link>
				</div>
				<br />
				<div>
					<div className="schedules-view">
						<ScheduleComponent className="schedules-view" currentView="Month">
							<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
						</ScheduleComponent>
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
								<p>Courses</p>
								<p>Version 2.0 Copyright ©2021 Fantastic Five</p>
							</CardContent>
							<CardActions>
								<div>
									<input type="checkbox" id="scales" name="scales" />
									<label for="scales">Closed</label>
									<input type="checkbox" id="scales" name="scales" />
									<label for="scales">Cancelled</label>
								</div>
							</CardActions>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}
export default SchedulesPage;
