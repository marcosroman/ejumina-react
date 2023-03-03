import { Navigate } from 'react-router-dom';
import useAuth, { AuthConsumer } from './useAuth';

const RequireAuth = ({ children }) => {
	const { authed } = useAuth();

	console.log("im returning authed as ", authed);
	return authed ? children : <Navigate to="/login" replace />
}

export default RequireAuth;
