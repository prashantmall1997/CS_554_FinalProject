import apiClient from "../client";

export const createSchedule = async (name, time, creator) => {
    let payload = {
        name: name,
        time: time,
        creator: creator
    }
    let data = await apiClient.post("/schedules/create", payload);
    return data.data;
}

export const readScheduleById = async(id) => {
    let payload = {
        id: id
    }
    let data = await apiClient.post("/schedules/readById", payload);
    return data.data;
}

export const readSchedulesByUser = async(id) => {
    let payload = {
        id: id
    }
    let data = await apiClient.post("/schedules/readByUser", payload);
    return data.data;
}

export const addClassToSchedule = async(id, classId) => {
    let payload = {
        id: id,
        classId: classId
    }
    let data = await apiClient.post("/schedules/addClass", payload);
    return data.data;
}

export const removeClassFromSchedule = async(id, classId) => {
    let payload = {
        id: id,
        classId: classId
    }
    let data = await apiClient.post("/schedules/removeClass", payload);
    return data.data;
}

export const updateScheduleName = async(id, name) => {
    let payload = {
        id: id,
        name: name
    }
    let data = await apiClient.post("/schedules/updateName", payload);
    return data.data;
}

export const removeSchedule = async() => {
    let payload = {
        id: id
    }
    let data = await apiClient.post("/schedules/remove", payload);
    return data.data;
}