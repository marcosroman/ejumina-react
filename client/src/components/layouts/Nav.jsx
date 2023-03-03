import { Link } from 'react-router-dom';
import appicon from '@static/appicon.png';
import powericon from '@static/powericon.png';

const Nav = () => {
	return (
		<nav className="flex justify-between">
			<Link to='/'><img src={appicon} className="h-8 w-8 mt-1"/></Link>
			<button><img src={powericon} className="h-5 w-5 mr-2"/></button>
		</nav>
	);
}

export default Nav;
