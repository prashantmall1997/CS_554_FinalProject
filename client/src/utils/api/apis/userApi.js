import apiClient from "../client";

export const readAllUsers = async () => {
  let data = await apiClient.get("/users/");
  return data.data;
};

export const createUser = async (username, email, CWID) => {
  let payload = {
    username: username,
    email: email,
    CWID: CWID,
  };
  let data = await apiClient.post("/users/create", payload);
  return data.data;
};

export const readUserByUsername = async (username) => {
  let payload = {
    username: username,
  };
  let data = await apiClient.post("/users/readByUsername", payload);
  return data.data;
};

export const readUserByEmail = async (email) => {
  let payload = {
    email: email,
  };
  let data = await apiClient.post("/users/readByEmail", payload);
  return data.data;
};

export const addScheduleToUser = async (username, scheduleId) => {
  let payload = {
    username: username,
    scheduleId: scheduleId,
  };
  let data = await apiClient.post("/users/addSchedule", payload);
  return data.data;
};

export const removeScheduleFromUser = async (username, scheduleId) => {
  let payload = {
    username: username,
    scheduleId: scheduleId,
  };
  let data = await apiClient.post("/users/removeSchedule", payload);
  return data.data;
};

export const removeUser = async (username) => {
  let payload = {
    username: username,
  };
  let data = await apiClient.post("/users/remove", payload);
  return data.data;
};

export const updateUser = async (username, email, CWID) => {
  let payload = {
    username: username,
    email: email,
    CWID: CWID,
  };
  let data = await apiClient.post("/users/update", payload);
  return data.data;
};

export const readUserByCWID = async (CWID) => {
  let payload = {
    CWID: CWID,
  };
  let data = await apiClient.post("/users/readByCWID", payload);
  return data.data;
};
