import React from "react";

const authContext = React.createContext();

const useAuth = () => {
	const [authed, setAuthed] = React.useState(false);

	const login = () => new Promise((res) => {
		setAuthed(true);
		res();
	});

	const logout = () => new Promise((res) => {
		setAuthed(false);
		res();
	});

	return {
		authed,
		login,
		logout
	};
}

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const AuthConsumer = () => {
  return React.useContext(authContext);
}

export { AuthProvider, AuthConsumer };
export default useAuth;

