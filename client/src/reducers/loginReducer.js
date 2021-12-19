const initalState = {
	isLoggedIn: false,
	isAdmin: false,
	username: null,
	email: null,
	CWID: null,
};

const loginReducer = (state = initalState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "LOG_IN_USER":
			return [
				{
					isLoggedIn: true,
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
					username: null,
					email: null,
					CWID: null,
				},
			];

		default:
			return state;
	}
};

export default loginReducer;
