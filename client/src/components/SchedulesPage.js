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

function SchedulesPage() {
	const [allClassesData, setAllClassesData] = useState();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");
	const [schedulesData, setSchedulesData] = useState();
	const [schedulesArr, setSchedulesArr] = useState([]);
	const userDetailsArray = useSelector((state) => state.login);
	let userDetails = userDetailsArray[0];

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

	// let sampleSchedules = [
	// 	{
	// 		title: "CS 510",
	// 		startDate: new Date(2021, 5, 25, 9, 35),
	// 		endDate: new Date(2021, 5, 25, 11, 30),
	// 	},
	// 	{
	// 		title: "CS 511",
	// 		startDate: new Date(2021, 5, 25, 12, 11),
	// 		endDate: new Date(2021, 5, 25, 13, 0),
	// 		id: 1,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CS 515",
	// 		startDate: new Date(2021, 5, 25, 14, 30),
	// 		endDate: new Date(2021, 5, 25, 15, 35),
	// 		id: 2,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 520",
	// 		startDate: new Date(2021, 5, 26, 10, 0),
	// 		endDate: new Date(2021, 5, 26, 11, 0),
	// 		id: 3,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 521",
	// 		startDate: new Date(2021, 5, 26, 12, 0),
	// 		endDate: new Date(2021, 5, 26, 13, 35),
	// 		id: 4,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 522",
	// 		startDate: new Date(2021, 5, 26, 14, 30),
	// 		endDate: new Date(2021, 5, 26, 15, 45),
	// 		id: 5,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 523",
	// 		startDate: new Date(2021, 5, 27, 9, 45),
	// 		endDate: new Date(2021, 5, 27, 11, 15),
	// 		id: 6,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CS 524",
	// 		startDate: new Date(2021, 5, 27, 12, 0),
	// 		endDate: new Date(2021, 5, 27, 14, 0),
	// 		id: 7,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 530",
	// 		startDate: new Date(2021, 5, 27, 15, 15),
	// 		endDate: new Date(2021, 5, 27, 16, 30),
	// 		id: 8,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 534",
	// 		startDate: new Date(2021, 5, 28, 11, 0),
	// 		endDate: new Date(2021, 5, 28, 12, 0),
	// 		id: 9,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 535",
	// 		startDate: new Date(2021, 5, 28, 11, 0),
	// 		endDate: new Date(2021, 5, 28, 13, 30),
	// 		id: 10,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CS 540",
	// 		startDate: new Date(2021, 5, 28, 14, 0),
	// 		endDate: new Date(2021, 5, 28, 15, 30),
	// 		id: 11,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 541",
	// 		startDate: new Date(2021, 5, 29, 10, 0),
	// 		endDate: new Date(2021, 5, 29, 11, 30),
	// 		id: 12,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 542",
	// 		startDate: new Date(2021, 5, 29, 14, 30),
	// 		endDate: new Date(2021, 5, 29, 16, 0),
	// 		id: 13,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 544",
	// 		startDate: new Date(2021, 5, 29, 16, 30),
	// 		endDate: new Date(2021, 5, 29, 18, 0),
	// 		id: 14,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 545",
	// 		startDate: new Date(2021, 5, 29, 12, 20),
	// 		endDate: new Date(2021, 5, 29, 14, 0),
	// 		id: 15,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 546",
	// 		startDate: new Date(2021, 6, 2, 9, 30),
	// 		endDate: new Date(2021, 6, 2, 15, 30),
	// 		id: 16,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CS 550",
	// 		startDate: new Date(2021, 6, 2, 12, 0),
	// 		endDate: new Date(2021, 6, 2, 13, 0),
	// 		id: 17,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 555",
	// 		startDate: new Date(2021, 6, 2, 14, 30),
	// 		endDate: new Date(2021, 6, 2, 17, 30),
	// 		id: 18,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 554",
	// 		startDate: new Date(2021, 6, 2, 16, 0),
	// 		endDate: new Date(2021, 6, 3, 9, 0),
	// 		id: 19,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 560",
	// 		startDate: new Date(2021, 6, 3, 10, 15),
	// 		endDate: new Date(2021, 6, 3, 13, 35),
	// 		id: 20,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CS 561",
	// 		startDate: new Date(2021, 6, 3, 14, 30),
	// 		endDate: new Date(2021, 6, 3, 15, 45),
	// 		id: 21,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 562",
	// 		startDate: new Date(2021, 6, 3, 15, 45),
	// 		endDate: new Date(2021, 6, 4, 12, 15),
	// 		id: 22,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 563",
	// 		startDate: new Date(2021, 6, 4, 12, 35),
	// 		endDate: new Date(2021, 6, 4, 14, 15),
	// 		id: 23,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 564",
	// 		startDate: new Date(2021, 6, 4, 15, 15),
	// 		endDate: new Date(2021, 6, 4, 20, 30),
	// 	},
	// 	{
	// 		title: "CS 565",
	// 		startDate: new Date(2021, 6, 5, 6, 0),
	// 		endDate: new Date(2021, 6, 5, 14, 20),
	// 	},
	// 	{
	// 		title: "CS 570",
	// 		startDate: new Date(2021, 6, 5, 14, 35),
	// 		endDate: new Date(2021, 6, 5, 16, 20),
	// 		id: 26,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CC 571",
	// 		startDate: new Date(2021, 6, 5, 10, 0),
	// 		endDate: new Date(2021, 6, 5, 11, 20),
	// 		id: 27,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 573",
	// 		startDate: new Date(2021, 6, 5, 20, 0),
	// 		endDate: new Date(2021, 6, 6, 13, 30),
	// 		id: 28,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 580",
	// 		startDate: new Date(2021, 6, 6, 14, 10),
	// 		endDate: new Date(2021, 6, 6, 15, 30),
	// 		id: 29,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 581",
	// 		startDate: new Date(2021, 6, 6, 10, 0),
	// 		endDate: new Date(2021, 6, 7, 14, 30),
	// 		id: 30,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "UCS 585",
	// 		startDate: new Date(2021, 6, 3, 9, 30),
	// 		endDate: new Date(2021, 6, 3, 12, 25),
	// 		id: 31,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 586",
	// 		startDate: new Date(2021, 6, 3, 12, 30),
	// 		endDate: new Date(2021, 6, 3, 18, 0),
	// 		id: 32,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 587",
	// 		startDate: new Date(2021, 6, 3, 12, 20),
	// 		endDate: new Date(2021, 6, 3, 14, 10),
	// 		id: 33,
	// 		location: "Room 2",
	// 	},
	// 	{
	// 		title: "CS 589",
	// 		startDate: new Date(2021, 5, 26, 0, 0),
	// 		endDate: new Date(2021, 5, 27, 0, 0),
	// 		id: 34,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CS 592",
	// 		startDate: new Date(2021, 5, 29, 10, 0),
	// 		endDate: new Date(2021, 5, 30, 14, 30),
	// 		id: 35,
	// 		location: "Room 1",
	// 	},
	// 	{
	// 		title: "CS 591",
	// 		startDate: new Date(2021, 6, 3, 0, 0),
	// 		endDate: new Date(2021, 6, 4, 10, 30),
	// 		id: 36,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 590",
	// 		startDate: new Date(2021, 6, 5, 10, 0),
	// 		endDate: new Date(2021, 6, 9, 14, 30),
	// 		id: 37,
	// 		location: "Room 3",
	// 	},
	// 	{
	// 		title: "CS 600",
	// 		startDate: new Date(2021, 6, 1, 10, 0),
	// 		endDate: new Date(2021, 6, 3, 14, 30),
	// 	},
	// 	{
	// 		title: "CS 610",
	// 		startDate: new Date(2021, 6, 1),
	// 		endDate: new Date(2021, 6, 2),
	// 	},
	// ];

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
	let appointments = schedulesArr.map(({ startDate, endDate, ...restArgs }) => {
		const result = {
			...makeTodaySchedule(startDate, endDate),
			...restArgs,
		};
		date += 1;
		if (date > 31) date = 1;
		return result;
	});

	// use effect for getting all the users data specificily the schedule
	let scheduleIdArr = [];
	// let classesIdArr = [];
	let indiClassData = [];
	const [classesIdArr, setClassesIdArr] = useState("");
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
						setClassesIdArr(data1.classes);
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
							// console.log(schedulesfin);
						} else {
							//its a WS course
						}
					}
					setSchedulesArr(schedulesfin);
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
					<Link className="profilepagelink" to="/userProfile">
						Profile Page
					</Link>{" "}
					<Link className="profilepagelink" to="/createschedule">
						Create New Schedule
					</Link>
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
								<Dropdown.Toggle variant="success">Courses</Dropdown.Toggle>
								<Dropdown>
									{allClassesData &&
										allClassesData.map((x) => {
											return (
												<Dropdown.Menu>
													<Dropdown.Item href="#">{x}</Dropdown.Item>
												</Dropdown.Menu>
											);
										})}
								</Dropdown>
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
