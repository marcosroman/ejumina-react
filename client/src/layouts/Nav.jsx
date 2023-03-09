import { Link, useNavigate } from 'react-router-dom';

import useAuth from '@auth/useAuth';
import appicon from '@static/appicon.png';
import powericon from '@static/powericon.png';
import axios from 'axios';

const Nav = () => {
	const navigate = useNavigate();
	const { authed, rol, CI, logout } = useAuth();

	const logoutHandler = (e) =>
		axios.get('http://localhost:8000/api/user/logout')
			.then(() => {
				logout();
				//localStorage.removeItem('userToken');
				//localStorage.clear();
				//localStorage.removeItem("userToken");
				//(none of the above works... why???!)
				navigate('/login');
			})
			.catch(err => console.log(err));

	return (
		<nav className="flex justify-between mb-3">
			<Link to='/'><img src={appicon} className="h-8 w-8 mt-1"/></Link>
			{authed && 
				<>
				<div className="my-auto text-center ">
					<p className="m-0 text-xs text-gray-600">{CI}</p>
					<p className="m-0 text-xs font-semibold text-gray-900">{rol}</p>
				</div>

				<button
				onClick={e=>logoutHandler(e)}
				><img src={powericon} className="rotate-90 h-5 w-5 mr-2"/></button></>}
		</nav>
	);
}

export default Nav;
