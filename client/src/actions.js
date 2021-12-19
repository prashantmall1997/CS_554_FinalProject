const loginUser = (firebaseToken, isAdmin, username, email, CWID) => ({
  type: "LOG_IN_USER",
  payload: {
    firebaseToken: firebaseToken,
    isAdmin: isAdmin,
    username: username,
    email: email,
    CWID: CWID,
  },
});

const logoutUser = () => ({
  type: "LOG_OUT_USER",
});

module.exports = {
  loginUser,
  logoutUser,
};
