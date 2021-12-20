# CS_554_FinalProject

**Instructions to run App:**
git clone repo to system

Configure mongoConnection.js file

run below commands in server folder:

run npm install 

run redis-server 

run redis-cli

run npm start

run below commands in client folder:

run npm install 

run npm start


**Team Members:**
Jackson Perry - 10458321

Prashant Mall - 10459371

Preet Dabhi - 10459151

Mrunal Salunke - 10467935 

Samantha Himmelreich - 10388503

**Introduction:**
Stevens Scheduler 2 will be a visual service that allows Stevens students to construct their schedule based on the classes shown on Workday. This will be a remake of the original SIT scheduler, which was fondly used by previous students but unfortunately does not work after the change to Workday. We would also be able to add features to improve the original scheduler. Not only would students be able to construct their schedules, but they would also be able to create an account and save their schedules (in case they don’t end up getting the one they want). They would also be able to share these schedules with anybody, based on their username, email, or with a URL that would link directly to their custom schedule. While making their schedule, the students would also be able to look directly at ratemyprofessor scores and information for each section in order to choose the best professors available to them. They would also be able to search sections based on the start times of the classes in case they don’t want to take any of those pesky 8 am classes.
        
**Course Technologies:**
React: Frontend UI library used to develop components for our application. This will allow us to create a single-page application with dynamic and reusable components since we will mostly be working on course section data

Redis: Used to store search information as well as information that is retrieved from the database in order to reduce the number of database calls (which includes past schedules that have been made)

Firebase: Allow users to log in to be able to save their schedules, as well as control who is able to view their schedules (so people will be able to share their schedules based on email/username/with a URL link)
 
**Independent Technologies:**
Elasticsearch: A service used to quickly search through databases which can be used to query the course sections by teacher and class name and allow for speedy results being delivered to students

Heroku: A server hosting service that will be used to deploy the website live to a URL
