//CSS & API Funcitons
import "../App.css";
import {
  readAllClasses,
  readSchedulesByUser,
  addClassToSchedule,
  readClassesBySchedule,
  createSchedule,
  removeSchedule,
  removeClassFromSchedule,
  addScheduleToUser,
  removeScheduleFromUser,
  readUserByUsername,
} from "../utils/api";

//React and UI
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import moment from "moment";

//Redux
import { useDispatch, useSelector } from "react-redux";
import actions from "./../actions";

//Firebase
import { getAuth } from "firebase/auth";
const auth = getAuth();

//Elasticsearch
require("dotenv").config();
const elasticsearch = require("elasticsearch");
const connectionString = process.env.SEARCH_URL;
const client = new elasticsearch.Client({
    host: connectionString,
    maxRetries: 5,
    requestTimeout: 300000,
    deadTimeout: 300000,
    keepAlive: true
});

export function CreateSchedule() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login[0]);

  const [activeSchedule, setActiveSchedule] = useState({
    _id: "",
    name: "",
    time: "",
    creator: "",
    classes: [],
  });
  const [activeClasses, setActiveClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [userId, setUserId] = useState("");
  const [textSearchResults, setTextSearchResults] = useState([]);
  const [isUsingText, setIsUsingText] = useState(false);

  useEffect(() => {
    readUserByUsername(user.username).then((info) => {
      setUserId(info._id);
    });
  }, [user.username]);
  useEffect(() => {
    readAllClasses().then((classes) => {
      setAllClasses(classes);
    });
  }, []);

  useEffect(() => {
    readUserByUsername(user.username).then((info) => {
      readSchedulesByUser(info._id).then((schedules) => {
        setSchedules(schedules);
      });
    });
  }, [activeSchedule, user.username]);

  useEffect(() => {
    if (activeSchedule._id !== "") {
      readClassesBySchedule(activeSchedule._id).then((classes) => {
        setActiveClasses(classes);
      });
    }
  }, [activeSchedule._id]);

    const handleClassNameSearch = async(e) => {
        if (e.target.value !== "") {
          setIsUsingText(true);
        } else {
          setIsUsingText(false)
        }
        const searchTerm = e.target.value;

        const results = await client.search({
            index: "classes",
            body: {
                query: { 
                    match: {
                        courseTitle: `*${searchTerm}*`
                    }
                }
            }
        });
        let resultArr = [];
        for (let result of results.hits.hits) {
          let obj = result._source;
          obj._id = result._source.id;
          resultArr.push(obj);
        }
        setTextSearchResults(resultArr);
    }

  const [search, setSearch] = useState({
    name: "",
    semester: "",
    subjects: [],
    level: [],
    status: [],
    format: [],
    deliveryMode: [],
  });

  // get distinct values to populate the search options
  let academicLevels = [];
  let semesters = [];
  let subjects = [];
  let formats = [];
  let deliveryModes = [];
  if (allClasses !== undefined && allClasses.length !== 0) {
    academicLevels = [...new Set(allClasses.map((item) => item.courseLevel))];
    semesters = [...new Set(allClasses.map((item) => item.courseTime))];
    subjects = [...new Set(allClasses.map((item) => item.coursePrefix))];
    formats = [...new Set(allClasses.map((item) => item.format))];
    deliveryModes = [...new Set(allClasses.map((item) => item.deliveryMode))];
  }

  const handleSemesterSearch = (e) => {
    setSearch({
      name: search.name,
      semester: e.target.value,
      subjects: search.subjects,
      level: search.level,
      status: search.status,
      format: search.format,
      deliveryMode: search.deliveryMode,
    });
  };

  const handleSubjectSearch = (e) => {
    let arr = [...search.subjects, e.target.value];
    if (search.subjects.includes(e.target.value)) {
      arr = arr.filter((val) => val !== e.target.value);
    }

    setSearch({
      name: search.name,
      semester: search.semester,
      subjects: arr,
      level: search.level,
      status: search.status,
      format: search.format,
      deliveryMode: search.deliveryMode,
    });
  };

  const handleLevelSearch = (e) => {
    let arr = [...search.level, e.target.value];
    if (search.level.includes(e.target.value)) {
      arr = arr.filter((val) => val !== e.target.value);
    }

    setSearch({
      name: search.name,
      semester: search.semester,
      subjects: search.subjects,
      level: arr,
      status: search.status,
      format: search.format,
      deliveryMode: search.deliveryMode,
    });
  };

  const handleStatusSearch = (e) => {
    let arr = [...search.status, e.target.value];
    if (search.status.includes(e.target.value)) {
      arr = arr.filter((val) => val !== e.target.value);
    }

    setSearch({
      name: search.name,
      semester: search.semester,
      subjects: search.subjects,
      level: search.level,
      status: arr,
      format: search.format,
      deliveryMode: search.deliveryMode,
    });
  };

  const handleFormatSearch = (e) => {
    let arr = [...search.format, e.target.value];
    if (search.format.includes(e.target.value)) {
      arr = arr.filter((val) => val !== e.target.value);
    }

    setSearch({
      name: search.name,
      semester: search.semester,
      subjects: search.subjects,
      level: search.level,
      status: search.status,
      format: arr,
      deliveryMode: search.deliveryMode,
    });
  };

  const handleDeliveryModeSearch = (e) => {
    let arr = [...search.deliveryMode, e.target.value];
    if (search.deliveryMode.includes(e.target.value)) {
      arr = arr.filter((val) => val !== e.target.value);
    }

    setSearch({
      name: search.name,
      semester: search.semester,
      subjects: search.subjects,
      level: search.level,
      status: search.status,
      format: search.format,
      deliveryMode: arr,
    });
  };

  let courses = allClasses;
  //let courseSearch = search.name.trim().toLowerCase();

  // if (courseSearch.length > 0) {
  //   courses = courses.filter((val) =>
  //     val.courseTitle.toLowerCase().includes(courseSearch)
  //   );
  // }

  if (isUsingText) {
    courses = textSearchResults;
  }

  let courseSearch = search.semester;
  if (courseSearch.length > 0) {
    courses = courses.filter((val) => val.courseTime.match(courseSearch));
  }

  courseSearch = search.subjects;
  if (courseSearch.length > 0) {
    courses = courses.filter((val) => courseSearch.includes(val.coursePrefix));
  }

  courseSearch = search.level;
  if (courseSearch.length > 0) {
    courses = courses.filter((val) => courseSearch.includes(val.courseLevel));
  }

  courseSearch = search.status;
  if (courseSearch.length > 0) {
    courses = courses.filter((val) => courseSearch.includes(val.sectionStatus));
  }

  courseSearch = search.format;
  if (courseSearch.length > 0) {
    courses = courses.filter((val) => courseSearch.includes(val.format));
  }

  courseSearch = search.deliveryMode;
  if (courseSearch.length > 0) {
    courses = courses.filter((val) => courseSearch.includes(val.deliveryMode));
  }

  // if there are no filters selected, don't show any classes -- that list will be looong
  if (
    textSearchResults.length === 0 &&
    search.semester === "" &&
    search.subjects.length === 0 &&
    search.level.length === 0 &&
    search.status.length === 0 &&
    search.format.length === 0 &&
    search.deliveryMode.length === 0
  ) {
    courses = [];
  }


  // filter out classes already in the selected schedule
  if (activeSchedule._id !== "") {
    for (let cl in activeClasses) {
      courses = courses.filter((val) => cl._id !== val._id);
    }
  }

  const getTimes = (sectionDetails) => {
    // initialize course time
    let times = {
      days: [],
      start: moment("12:00 AM", "h:mm A"),
      end: moment("12:00 AM", "h:mm A"),
    };

    if (sectionDetails.includes("Monday")) times.days.push("Monday");
    if (sectionDetails.includes("Tuesday")) times.days.push("Tuesday");
    if (sectionDetails.includes("Wednesday")) times.days.push("Wednesday");
    if (sectionDetails.includes("Thursday")) times.days.push("Thursday");
    if (sectionDetails.includes("Friday")) times.days.push("Friday");
    if (sectionDetails.includes("Saturday")) times.days.push("Saturday");
    if (sectionDetails.includes("Sunday")) times.days.push("Sunday");

    let timeRange = sectionDetails.substring(
      sectionDetails.lastIndexOf("|") + 1
    );
    times.start = moment(timeRange.split("-")[0], "h:mm A");
    times.end = moment(timeRange.split("-")[1], "h:mm A");

    return times;
  };

  const compareTimesWithActiveSchedule = (course) => {
    let conflicts = [];
    for (let i in activeClasses) {
      let existingTimes = getTimes(activeClasses[i].sectionDetails);
      let courseTimes = getTimes(course.sectionDetails);

      let start1 =
        existingTimes.start.hour() + existingTimes.start.minute() / 60;
      let end1 = existingTimes.end.hour() + existingTimes.end.minute() / 60;
      let start2 = courseTimes.start.hour() + courseTimes.start.minute() / 60;
      let end2 = courseTimes.end.hour() + courseTimes.end.minute() / 60;

      const overlappingDays = courseTimes.days.filter((day) =>
        existingTimes.days.includes(day)
      );

      conflicts.push({
        overlappingDays: overlappingDays,
        start1: start1,
        end1: end1,
        start2: start2,
        end2: end2,
      });
    }

    if (conflicts.length === 0) {
      return "";
    }

    // todo check extensively to make sure this logic is right
    for (let conflict of conflicts) {
      if (conflict.overlappingDays.length !== 0) {
        if (
          conflict.start1 <= conflict.start2 &&
          conflict.end1 > conflict.start2
        ) {
          return "result-conflict";
        } else if (
          conflict.start1 < conflict.end2 &&
          conflict.end1 > conflict.end2
        ) {
          return "result-conflict";
        } else if (
          conflict.start2 <= conflict.start1 &&
          conflict.end2 > conflict.start1
        ) {
          return "result-conflict";
        } else if (
          conflict.start2 < conflict.end1 &&
          conflict.end2 > conflict.end1
        ) {
          return "result-conflict";
        }
      }
    }
    return "";
  };

  const scheduleSelectButtons = (schedule) => {
    if (activeSchedule.name === schedule.name) {
      return (
        <Button variant="secondary" className="m-1" disabled>
          {schedule.name} (active)
        </Button>
      );
    } else {
      const active = {
        _id: schedule._id,
        name: schedule.name,
        time: schedule.time,
        creator: schedule.creator,
        classes: schedule.classes,
      };
      return (
        <Button
          variant="success"
          className="m-1"
          onClick={() => {
            setActiveSchedule(active);
          }}
        >
          Select {schedule.name}
        </Button>
      );
    }
  };

  const scheduleSection = () => {
    if (schedules === null || schedules.length === 0) {
      return <h3>No schedules exist yet</h3>;
    } else {
      return schedules.map((schedule) => (
        <div className="schedule-select" key={`schedules-${schedule}`}>
          {scheduleSelectButtons(schedule)}
        </div>
      ));
    }
  };

  const addRemoveButton = (course) => {
    if (activeSchedule.classes.includes(course._id)) {
      return (
        <button
          className="add-remove-course"
          onClick={() => {
            removeFromSchedule(course._id);
          }}
        >
          <img
            src="https://img.icons8.com/color/48/000000/minus.png"
            alt="remove from schedule"
          />
          Remove
        </button>
      );
    } else {
      return (
        <button
          className="add-remove-course"
          onClick={() => {
            addToSchedule(course._id);
          }}
        >
          <img
            src="https://img.icons8.com/color/48/000000/add--v1.png"
            alt="add to schedule"
          />
          Add to schedule
          <br />
          {compareTimesWithActiveSchedule(course) !== ""
            ? "Warning: This course section conflicts with one already in the selected schedule"
            : ""}
        </button>
      );
    }
  };

  const handleRemoveSchedule = (e) => {
    const id = activeSchedule._id;
    removeSchedule(id).then(() => {
      removeScheduleFromUser(user.username, id).then(() => {
        setActiveSchedule({
          _id: "",
          name: "",
          time: "",
          creator: "",
          classes: [],
        });
      });
    });
  };

  const showSchedule = () => {
    if (activeSchedule.name === "") {
      return;
    } else {
      for (let i of schedules) {
        if (i.name === activeSchedule.name) {
          return (
            <div>
              <h2>Courses in "{activeSchedule.name}"</h2>
              <Button variant="danger" onClick={(e) => handleRemoveSchedule(e)}>
                Delete Schedule
              </Button>
              <Row xs={4}>
                {activeClasses.map((course) => (
                  <Col className="p-2 mt-2" key={`schedule-${course._id}`}>
                    <Card className="class-results-card">
                      <Card.Title>{course.courseTotal}</Card.Title>
                      <Card.Body>
                        <p className="course-details">
                          <span className="fw-bold">Section Details:</span>{" "}
                          {course.sectionDetails}
                        </p>
                        <p className="course-details">
                          <span className="fw-bold">Instructor:</span>{" "}
                          {course.instructor}
                        </p>
                        <p className="course-details">
                          <span className="fw-bold">Format:</span>{" "}
                          {course.format}
                        </p>
                        <p className="course-details">
                          <span className="fw-bold">Delivery Mode:</span>{" "}
                          {course.deliveryMode}
                        </p>
                        <p className="course-details">
                          <span className="fw-bold">Enrolled/Capacity:</span>{" "}
                          {course.enrolledCapacity}
                        </p>
                      </Card.Body>
                      <Card.Footer>
                        <button
                          className="add-remove-course"
                          onClick={() => {
                            removeFromSchedule(course._id);
                          }}
                        >
                          <img
                            src="https://img.icons8.com/color/48/000000/minus.png"
                            alt="remove from schedule"
                          />
                          Remove
                        </button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          );
        }
      }
      return;
    }
  };

  const addToSchedule = (id) => {
    for (let i in schedules) {
      if (schedules[i].name === activeSchedule.name) {
        addClassToSchedule(schedules[i]._id, id).then(() => {
          readClassesBySchedule(activeSchedule._id).then((classes) => {
            setActiveClasses(classes);
          });
        });
      }
    }
  };

  const removeFromSchedule = (id) => {
    for (let i in schedules) {
      if (schedules[i].name === activeSchedule.name) {
        removeClassFromSchedule(schedules[i]._id, id).then(() => {
          readClassesBySchedule(activeSchedule._id).then((classes) => {
            setActiveClasses(classes);
          });
        });
      }
    }
  }

  const courseForm = () => {
    return (
      <Row>
        <Col xs={12} md={3}>
          <form>
            <h2>Search</h2>
                <label htmlFor="courseName" />
                <input 
                    onChange={(e) => handleClassNameSearch(e)} 
                    id="courseName" 
                    name="courseName" 
                    placeholder="Search class name..."
                />
                <Card className="p-3 mt-3 schedule-form-card">
                    <Card.Title className="text-center">Semester</Card.Title>
                    {semesters.map((semester) =>
                        <div key={`time-${semester}`}>
                            <label htmlFor={semester.replaceAll(" ", "")}>{semester}</label>
                            <input 
                                type="radio" 
                                id={semester.replaceAll(" ", "")}
                                name="semester"
                                value={semester}
                                onChange={(e) => handleSemesterSearch(e)} 
                            />
                            <br />
                        </div>
                    )}
                </Card>
                <Card className="p-3 mt-3 schedule-form-card">
                    <Card.Title className="text-center">Course Level</Card.Title>
                    {academicLevels.map((level) =>
                        <div key={`level-${level}`}>
                            <label htmlFor={level.replaceAll(" ", "")}>{level}</label>
                            <input 
                                type="checkbox" 
                                id={level.replaceAll(" ", "")} 
                                name={level.toLowerCase()}
                                value={level}
                                onChange={(e) => handleLevelSearch(e)} 
                            />
                            <br />
                        </div>
                    )}
                </Card>
                <Card className="p-3 mt-3 schedule-form-card">
                    <Card.Title className="text-center">Subjects</Card.Title>
                    {subjects.map((subject) =>
                        <div key={`subject-${subject}`}>
                            <input 
                                type="checkbox" 
                                id={subject.replaceAll(" ", "").toLowerCase()}
                                name={subject.replaceAll(" ", "").toLowerCase()}
                                value={subject}
                                onChange={(e) => handleSubjectSearch(e)}
                            />
                            <label htmlFor={subject.replaceAll(" ", "").toLowerCase()}>{subject}</label>
                            <br />
                        </div>
                    )}
                </Card>
                <Card className="p-3 mt-3 schedule-form-card">
                    <Card.Title className="text-center">Status</Card.Title>
                    <div key="openstatus">
                        <input 
                            type="checkbox" 
                            id="open"
                            name="open"
                            value="Open"
                            onChange={(e) => handleStatusSearch(e)} 
                        />
                        <label htmlFor="open">Open</label>
                        <br />
                    </div>
                    <div key="closedstatus">
                        <input 
                            type="checkbox" 
                            id="closed"
                            name="closed"
                            value="Closed"
                            onChange={(e) => handleStatusSearch(e)} 
                        />
                        <label htmlFor="closed">Closed</label>
                        <br />
                    </div>
                </Card>
                <Card className="p-3 mt-3 schedule-form-card">
                    <Card.Title className="text-center">Formats</Card.Title>
                    {formats.map((format) =>
                        <div key={`format-${format}`}>
                            <input 
                                type="checkbox" 
                                id={format.replaceAll(" ", "").toLowerCase()}
                                name={format.replaceAll(" ", "").toLowerCase()}
                                value={format}
                                onChange={(e) => handleFormatSearch(e)} 
                            />
                            <label htmlFor={format.replaceAll(" ", "").toLowerCase()}>{format}</label>
                            <br />
                        </div>
                    )}
                </Card>
                <Card className="p-3 mt-3 schedule-form-card">
                    <Card.Title className="text-center">Delivery Format</Card.Title>
                    {deliveryModes.map((deliveryMode) =>
                        <div key={`delivery-${deliveryMode}`}>
                            <input 
                                type="checkbox" 
                                id={deliveryMode.replaceAll(" ", "").toLowerCase()}
                                name={deliveryMode.replaceAll(" ", "").toLowerCase()}
                                value={deliveryMode}
                                onChange={(e) => handleDeliveryModeSearch(e)} 
                            />
                            <label htmlFor={deliveryMode.replaceAll(" ", "").toLowerCase()}>{deliveryMode}</label>
                            <br />
                        </div>
                    )}
                </Card>
			        </form>
            </Col>
            <Col xs={12} md={9}>
              <h2>Courses</h2>
              {courses.map(course => 
                <Col className="p-2 mt-2" key={`courselist-${course._id}`}>
                  <Card className={`class-results-card ${compareTimesWithActiveSchedule(course)}`}>
                    <Card.Title>{course.courseTotal}</Card.Title>
                    <Card.Body>
                      <Row xs={1} md={2}>
                        <Col><p className="course-details"><span className="fw-bold">Section Details:</span> {course.sectionDetails}</p></Col>
                        <Col><p className="course-details"><span className="fw-bold">Instructor:</span> {course.instructor}</p></Col>
                        <Col><p className="course-details"><span className="fw-bold">Format:</span> {course.format}</p></Col>
                        <Col><p className="course-details"><span className="fw-bold">Delivery Mode:</span> {course.deliveryMode}</p></Col>
                        <Col><p className="course-details"><span className="fw-bold">Enrolled/Capacity:</span> {course.enrolledCapacity}</p></Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      {addRemoveButton(course)}
                    </Card.Footer>
                </Card>
            </Col>
            )}
          </Col>
        </Row>
      );
    };

  const handleAddSchedule = (e) => {
    createSchedule(e.target.form[0].value, e.target.form[1].value, userId).then(
      (sched) => {
        addScheduleToUser(user.username, sched._id).then(() => {
          readSchedulesByUser(userId).then((schedules) => {
            setSchedules(schedules);
          });
        });
      }
    );
  };

  const handleSignout = async () => {
    dispatch(actions.logoutUser());
    await auth.signOut();
  };

  return (
    <div>
      <div className="topbar">SIT Scheduler 2.0</div>
      <div className="sidebar">
        <div className="sidebar-text">Welcome, {user.username}</div>
        <br />
        {user.isAdmin ? (
          <a href="/admin" className="sidebar-button">
            Admin
          </a>
        ) : (
          ""
        )}
        <a
          href="/userprofile"
          className="sidebar-button"
        >
          User Profile
        </a>
        <a
          href="/createschedule"
          className="sidebar-button sidebar-button-active"
        >
          Create Schedule
        </a>
        <a href="/schedules" className="sidebar-button">
          Schedules
        </a>
        <div className="sidebar-button" onClick={() => handleSignout()}>
          Sign out
        </div>
      </div>
      <div className="main-content">
        <div>
          <h1>Create a Schedule</h1>
          <h2>Add New Schedule</h2>
          <form>
            <label htmlFor="addSchedule" />
            <input
              id="addSchedule"
              name="addSchedule"
              placeholder="Enter schedule name"
            />
            {semesters.map((semester) => (
              <div key={`schedulesemester-${semester}`}>
                <input
                  type="radio"
                  id={semester.replaceAll(" ", "") + "2"}
                  name="time"
                  value={semester}
                />
                <label htmlFor={semester.replaceAll(" ", "") + "2"}>{semester}</label>
                <br />
              </div>
            ))}
            <Button
              variant="success"
              className="m-1"
              onClick={(e) => {
                handleAddSchedule(e);
              }}
            >
              Create
            </Button>
          </form>
          <h2>Select Existing Schedule</h2>
          {scheduleSection()}
          {showSchedule()}
          <br />
          {courseForm()}
        </div>
      </div>
    </div>
  );
}

export default CreateSchedule;