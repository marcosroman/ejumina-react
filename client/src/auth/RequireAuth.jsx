import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@auth/useAuth';

const RequireAuth = ({authedRoles, children }) => {
	const { authed, rol } = useAuth();
	const location = useLocation();

	console.log("im returning authed as", authed, "and rol as", rol);
	console.log("autheds are",authedRoles);

	if (authed) {
		if (authedRoles.includes(rol)) {
			return children;
		} else {
			return <Navigate to="/unauthorized" replace />
		}
	} else {
		return <Navigate to="/login" replace state={{ path: location.pathname }} />
	}


	//return (authed && authedRoles.includes(rol)) ? children
//								: <Navigate to="/login" replace state={{ path: location.pathname }} />
}

export default RequireAuth;
