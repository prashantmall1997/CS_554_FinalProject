import apiClient from "../client";

export const readAllClasses = async () => {
    try {
        let data = await apiClient.get("/classes/");
        return data.data;
    } catch(error) {
        console.log(error.message);
    }
};

export const createClass = async (courseTime, courseLevel, courseTotal, coursePrefix, courseCode, courseSection, courseTitle, sectionStatus, instructor, sectionDetails, campus, format, deliveryMode, enrolledCapacity) => {
    let payload = {
        courseTime: courseTime,
        courseLevel: courseLevel,
        courseTotal: courseTotal,
        coursePrefix: coursePrefix,
        courseCode: courseCode,
        courseSection: courseSection,
        courseTitle: courseTitle,
        sectionStatus: sectionStatus,
        instructor: instructor,
        sectionDetails: sectionDetails,
        campus: campus,
        format: format,
        deliveryMode: deliveryMode,
        enrolledCapacity: enrolledCapacity
    }
    let data = await apiClient.post("/classes/create/", payload);
    return data.data;
}

export const readClassById = async(id) => {
    let payload = {
        id: id
    }
    let data = await apiClient.post("/classes/readById", payload);
    return data.data;
}

export const readClassByCourseTime = async(courseTime) => {
    let payload = {
        courseTime: courseTime
    }
    let data = await apiClient.post("/classes/readByCourseTime", payload);
    return data.data;
}

export const readClassByCourseTotal = async(courseTotal) => {
    let payload = {
        courseTotal: courseTotal
    }
    let data = await apiClient.post("/classes/readByCourseTotal", payload);
    return data.data;
}

export const updateOrInsertClassByCourseTotal = async(courseTime, courseLevel, courseTotal, coursePrefix, courseCode, courseSection, courseTitle, sectionStatus, instructor, sectionDetails, campus, format, deliveryMode, enrolledCapacity) => {
    let payload = {
        courseTime: courseTime,
        courseLevel: courseLevel,
        courseTotal: courseTotal,
        coursePrefix: coursePrefix,
        courseCode: courseCode,
        courseSection: courseSection,
        courseTitle: courseTitle,
        sectionStatus: sectionStatus,
        instructor: instructor,
        sectionDetails: sectionDetails,
        campus: campus,
        format: format,
        deliveryMode: deliveryMode,
        enrolledCapacity: enrolledCapacity
    }
    let data = await apiClient.post("/classes/updateOrInsertByCourseTotal", payload);
    return data.data;
}

export const removeClassById = async(id) => {
    let payload = {
        id: id
    }
    let data = await apiClient.post("/classes/removeById", payload);
    return data.data;
}

export const removeAllClasses = async() => {
    let data = await apiClient.get("/classes/removeAll");
    return data.data;
}

export const readClassesBySchedule = async(id) => {
    let payload = {
        id: id
    }
    let data = await apiClient.post("/schedules/readById", payload);
    let schedule = data.data;
    if(schedule.error) return null;
    let classes = [];
    for(let classId of schedule.classes) {
        console.log(classId);
        let thisClass = await readClassById(classId);
        classes.push(thisClass);
    }
    return classes;
}