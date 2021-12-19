const initalState = {
  isLoggedIn: false,
};

const loginReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOG_IN_USER":
      return [
        {
          isLoggedIn: true,
          firebaseToken: payload.firebaseToken,
          isAdmin: payload.isAdmin,
          username: payload.username,
          email: payload.email,
          CWID: payload.CWID,
        },
      ];

    case "LOG_OUT_USER":
      return [
        {
          isLoggedIn: false,
        },
      ];

    default:
      return state;
  }
};

export default loginReducer;
