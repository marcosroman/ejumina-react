import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appicon from '@static/appicon.png';
import useAuth from '@auth/useAuth';
import Loading from '@views/Loading';

const Main = () =>{
	const navigate = useNavigate();
	const {rol} = useAuth();

	useEffect(() => {
		if (rol === "RRPP") {
			navigate('/rrpp');
		} else if (rol === "Admin") {
			navigate('/admin');
		} else {
			navigate('/bouncer');
		}
	},[]);

	return <Loading/>

	/*
	return (
		<div>
			<h1 className="text-bold text-blue-600 text-center md:text-5xl m-20 sm:text-xl">ejumina</h1>
			<p>{rol}</p>
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
	*/
}

export default Main;
