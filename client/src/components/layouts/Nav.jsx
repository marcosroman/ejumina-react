import { Link } from 'react-router-dom';
import appicon from '@static/appicon.png';
import powericon from '@static/powericon.png';
import axios from 'axios';

const Nav = () => {
	const logout = (e) =>
		axios.get('http://localhost:8000/api/user/logout')
			.then(() => {
				navigate('/login');
			})
			.catch(err => console.log(err));

	return (
		<nav className="flex justify-between">
			<Link to='/'><img src={appicon} className="h-8 w-8 mt-1"/></Link>
			<button
				onClick={e=>logout(e)}
				><img src={powericon} className="h-5 w-5 mr-2"/></button>
		</nav>
	);
}

export default Nav;
