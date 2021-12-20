import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import stevenscardlogo from "../img/stevenslogo.png";
import Dropdown from "react-bootstrap/Dropdown";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import {
	Scheduler,
	WeekView,
	Appointments,
	AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { readUserByEmail } from "../utils/api/apis/userApi";
import { readAllClasses, readClassById } from "../utils/api/apis/classApi";
import { readScheduleById } from "../utils/api/apis/scheduleApi";
import { useSelector, useDispatch } from "react-redux";
import actions from "./../actions";

let z = 1;

function SchedulesPage() {
	const [allClassesData, setAllClassesData] = useState();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");
	const [schedulesData, setSchedulesData] = useState();
	const [schedulesArr, setSchedulesArr] = useState([]);
	const userDetailsArray = useSelector((state) => state.login);
	let userDetails = userDetailsArray[0];
	const dispatch = useDispatch();

	const getTimes = (course) => {
		// initialize course time
		let times = {
			days: [],
			start: moment("12:00 AM", "h:mm A"),
			end: moment("12:00 AM", "h:mm A"),
		};
		if (course.sectionDetails.includes("Monday")) times.days.push("Monday");
		if (course.sectionDetails.includes("Tuesday")) times.days.push("Tuesday");
		if (course.sectionDetails.includes("Wednesday"))
			times.days.push("Wednesday");
		if (course.sectionDetails.includes("Thursday")) times.days.push("Thursday");
		if (course.sectionDetails.includes("Friday")) times.days.push("Friday");
		if (course.sectionDetails.includes("Saturday")) times.days.push("Saturday");
		if (course.sectionDetails.includes("Sunday")) times.days.push("Sunday");
		let timeRange = course.sectionDetails.substring(
			course.sectionDetails.lastIndexOf("|") + 1
		);
		times.start = moment(timeRange.split("-")[0], "h:mm A");
		times.end = moment(timeRange.split("-")[1], "h:mm A");

		return times;
	};
	// let appointments;
	let schedulesfin = [];
	let allSchedulesIdArray;

	const currentDate = moment();
	let date = currentDate.date();

	const makeTodaySchedule = (startDate, endDate) => {
		const days = moment(startDate).diff(endDate, "days");
		const nextStartDate = moment(startDate)
			.year(currentDate.year())
			.month(currentDate.month())
			.date(date);
		const nextEndDate = moment(endDate)
			.year(currentDate.year())
			.month(currentDate.month())
			.date(date + days);

		return {
			startDate: nextStartDate.toDate(),
			endDate: nextEndDate.toDate(),
		};
	};
	// use effect for getting all the users data specificily the schedule
	let scheduleIdArr = [];
	// let classesIdArr = [];
	let indiClassData = [];
	let appointments = [];
	const [classesIdArr, setClassesIdArr] = useState([]);
	let dataObj = {};
	useEffect(() => {
		async function fetchData() {
			try {
				const data = await readUserByEmail(userDetails.email);
				if (data.length === 0 || data === undefined) {
					setError(true);
				} else {
					setSchedulesData(data);
					allSchedulesIdArray = data.schedules;
					for (let i in allSchedulesIdArray) {
						scheduleIdArr.push(allSchedulesIdArray[i]);
					}
					for (let j in scheduleIdArr) {
						const data1 = await readScheduleById(scheduleIdArr[j]);
						for (let theClass of data1.classes) {
							classesIdArr.push(theClass);
						}
					}
					for (let k in classesIdArr) {
						const data2 = await readClassById(classesIdArr[k]);
						indiClassData.push(data2);
					}
					for (let a in indiClassData) {
						let coursestime = getTimes(indiClassData[a]);
						let starttime = coursestime.start._d;
						let endtime = coursestime.end._d;
						if (starttime !== "Invalid Date" || endtime !== "Invalid Date") {
							dataObj = {
								title: indiClassData[a].courseTotal,
								startDate: starttime,
								endDate: endtime,
							};
							schedulesfin.push(dataObj);
						} else {
							//its a WS course
						}
					}
					for (let schedule of schedulesfin) {
						schedulesArr.push(schedule);
					}
					appointments = schedulesArr.map(
						({ startDate, endDate, ...restArgs }) => {
							const result = {
								...makeTodaySchedule(startDate, endDate),
								...restArgs,
							};
							date += 1;
							if (date > 31) date = 1;
							return result;
						}
					);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);
	//use effect to store all the course title to display on the sidenav
	useEffect(() => {
		async function fetchData() {
			let allcourseTitle = [];
			try {
				const data = await readAllClasses();
				for (let i in data) {
					allcourseTitle.push(data[i].courseTitle);
				}
				setAllClassesData(allcourseTitle);
				if (data.length === 0 || data === undefined) {
					setError(true);
				} else {
					setAllClassesData(allcourseTitle);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {}, [appointments]);

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		console.log(appointments);
		return (
			<div className="schedules-page">
				<div className="header">
					<h1> Schedule Courses</h1>
					<Link className="profilepagelink" to="/userProfile">
						Profile Page
					</Link>{" "}
					<Link className="profilepagelink" to="/createschedule">
						Create New Schedule
					</Link>
					{/* Temp button to logout */}
					<button
						className="modal-button"
						onClick={() => {
							dispatch(actions.logoutUser());
						}}
					>
						Log Out
					</button>
					<div>
						Username:{userDetails.username} CWID:{userDetails.CWID}{" "}
					</div>
					{/* username and CWID is to be added*/}
				</div>
				<br />
				<div>
					<div className="schedules-view">
						<Paper>
							<Scheduler data={appointments} height={600}>
								<WeekView startDayHour={9} endDayHour={22} />
								<Appointments />
								{/* <AppointmentTooltip /> */}
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
								<Dropdown>
									<Dropdown.Toggle variant="success">Term</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item>Spring 2022</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								{/* <Dropdown.Toggle variant="success">Courses</Dropdown.Toggle>
								<Dropdown>
									{allClassesData &&
										allClassesData.map((x) => {
											z++;
											return (
												<Dropdown.Menu key={z}>
													<Dropdown.Item href="#">{x}</Dropdown.Item>
												</Dropdown.Menu>
											);
										})}
								</Dropdown> */}
								<br />
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
