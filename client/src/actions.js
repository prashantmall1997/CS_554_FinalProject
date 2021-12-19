const loginUser = (isAdmin, username, email, CWID) => ({
  type: "LOG_IN_USER",
  payload: { isAdmin: isAdmin, username: username, email: email, CWID: CWID },
});

const logoutUser = () => ({
  type: "LOG_OUT_USER",
});

module.exports = {
  loginUser,
  logoutUser,
};
