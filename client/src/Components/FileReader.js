import React, { Component } from 'react';
import { updateOrInsertClassByCourseTotal } from '../utils/api/apis/classApi';

import { CSVReader } from 'react-papaparse'

export default class FileReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "File Not Yet Inserted",
    }
  }

  handleOnDrop = async (data) => { //when the file is uplaoded
    this.setState({
      status: "File Inserted Successfully, Parsing File and adding to Mongo (WARNING: Do not close this page!)"
    });
    let rowCount = 1;
    let courseTime = null;
    let courseLevel = null;
    console.log('---------------------------');
    for(let row of data) {
      if(rowCount === 1 || rowCount === 2 | rowCount === 5) {
        rowCount++;
        continue;
      }
      else if(rowCount === 3) {
        courseTime = row.data[1];
        rowCount++;
        continue;
      }
      else if(rowCount === 4) {
        courseLevel = row.data[1];
        rowCount++;
        continue;
      }
      else if(rowCount === 6) { //Error checking file format
        let hit = false;

        if(courseTime === null || courseLevel === null) hit = true;
        else if(row.data[0] !== "Course Section") hit = true;
        else if(row.data[1] !== "Abbreviated Course Section Title") hit = true;
        else if(row.data[2] !== "Section Status") hit = true;
        else if(row.data[3] !== "Instructor (By Course Section)") hit = true;
        else if(row.data[4] !== "Section Details") hit = true;
        else if(row.data[5] !== "Campus") hit = true;
        else if(row.data[6] !== "Instructors") hit = true;
        else if(row.data[7] !== "Instructional Format") hit = true;
        else if(row.data[8] !== "Delivery Mode") hit = true;
        else if(row.data[9] !== "Enrolled/Capacity") hit = true;

        if(hit) {
          console.log("Error in file formatting");
          this.setState({
            status: "Error in file formatting",
          })
          break;
        }
        else {
          rowCount++;
          continue;
        }
      }
      else {
        if(row.data[0] === "Subject") {
          break;
        }
        else {
          try {
            let courseTotal = row.data[0];
            let coursePrefix = courseTotal.split(' ')[0];
            let courseCode = courseTotal.split(' ')[1].split('-')[0];
            let courseSection = courseTotal.split(' ')[1].split('-')[1];
            let courseTitle = row.data[1]  || "N/A";
            let sectionStatus = row.data[2] || "N/A";
            let instructor = row.data[3] || "N/A";
            let sectionDetails = row.data[4] || "N/A";
            let campus = row.data[5] || "N/A";
            let format = row.data[7] || "N/A";
            let deliveryMode = row.data[8] || "N/A";
            let enrolledCapacity = row.data[9] || "N/A";
            // console.log(`Course Time: ${courseTime}`);
            // console.log(`Course Level: ${courseLevel}`);
            // console.log(`Course Total: ${courseTotal}`);
            // console.log(`Course Prefix: ${coursePrefix}`);
            // console.log(`Course Code: ${courseCode}`);
            // console.log(`Course Section: ${courseSection}`);
            // console.log(`Course Title: ${courseTitle}`);
            // console.log(`Section Status: ${sectionStatus}`);
            // console.log(`Instructor: ${instructor}`);
            // console.log(`Section Details: ${sectionDetails}`);
            // console.log(`Campus: ${campus}`);
            // console.log(`Format: ${format}`);
            // console.log(`Delivery Mode: ${deliveryMode}`);
            // console.log(`Enrolled/Capcity: ${enrolledCapacity}`);
            console.time(`Successful completion for line ${rowCount} took`);
            let data = await updateOrInsertClassByCourseTotal(courseTime, courseLevel, courseTotal, coursePrefix, courseCode, courseSection, courseTitle, sectionStatus, instructor, sectionDetails, campus, format, deliveryMode, enrolledCapacity);
            if(data.error) throw data.error;
            console.timeEnd(`Successful completion for line ${rowCount} took`);
            rowCount++;
            continue;
          }
          catch(e) {
            console.log(`Error occured on line ${rowCount}: ${e}`);
            rowCount++;
            continue;
          }
        }
      }
    }
    console.log('---------------------------');
    this.setState({
      status: "File Done Being Inserted. Check the console (right click -> inspect element in chrome) to see the output. Safe to close the page.",
    });
  }

  handleOnError = (err, file, inputElem, reason) => { //when there's an error with the file
    console.log(err)
    this.setState({
      status: "Error with file.",
    });
  }

  handleOnRemoveFile = (data) => { //when the file is removed
    //data == null
  }

  render() {
    return (
      <div>
        <p>Tutorial: go to workday, academics, find course sections, hit the three dots next to "Find Course Sections" once on the page, hit standard report then schedule, select find course sections and run now.</p>
        <p>Once on the Schedule a Report page, select a single semester, select <strong>ONE</strong> academic level (ONLY select Gradaute, or ONLY select Undergraduate, etc.), and leave campus locations blank. Then hit ok on the bottom, download the xlsx file, use <a href="https://cloudconvert.com/xlsx-to-csv">anything</a> to convert that to a csv file.</p>
        <p>Upload the file below, and wait for it to run! It will begin running as soon as the file is uploaded.</p>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          removeButtonColor='#659cef'
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        <p>Current Status: {this.state.status}</p>
      </div>
    )
  }
}