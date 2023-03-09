import React, { useContext, createContext, useState } from "react";

const authContext = createContext();

const useAuth = () => {
	const [authed, setAuthed] = useState(false);
	const [rol, setRol] = useState("");
	const [CI, setCI] = useState("");
	const [userId, setUserId] = useState("");

	const login = (rol, CI, userId) => new Promise((res) => {
		setRol(rol);
		setCI(CI);
		setAuthed(true);
		setUserId(userId);
		res();
	});

	const logout = () => new Promise((res) => {
		setAuthed(false);
		res();
	});

	return {
		authed,
		rol,
		CI,
		userId,
		login,
		logout
	};
}

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
		<authContext.Provider value={auth}>
			{children}
		</authContext.Provider>
	);
}

const AuthConsumer = () => {
  return useContext(authContext);
}

export { AuthProvider };

export default AuthConsumer;

