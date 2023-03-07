import { Link } from 'react-router-dom';
import appicon from '@static/appicon.png';

const Main = () =>{
	return (
		<div>
			<h1 className="text-bold text-blue-600 text-center md:text-5xl m-20 sm:text-xl">ejumina</h1>
			<ul className="text-center">
				<li>
					<Link to="/bouncer">Bouncer View</Link>
				</li>
				<li>
					<Link to="/rrpp">RRPP View</Link>
				</li>
				<li>
					<Link to="/admin">Admin View</Link>
				</li>
			</ul>
		</div>
	);
}

export default Main;
