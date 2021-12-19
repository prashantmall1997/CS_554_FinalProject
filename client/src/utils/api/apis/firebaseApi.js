import apiClient from "../client";

export const deleteUserByEmailFirebase = async (email) => {
  let payload = {
    email: email,
  };
  let data = await apiClient.post(
    "/firebase/deleteUserByEmailFirebase",
    payload
  );
  return data.data;
};
