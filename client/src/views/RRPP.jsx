import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Nav from '@layouts/Nav';
import Loading from '@views/Loading'

const RRPP = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [upcomingEventos, setUpcomingEventos] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get("http://localhost:8000/api/evento/upcoming")
			.then(res => {
				setUpcomingEventos(res.data.eventos);
				setIsLoaded(true);
			})
			.catch(err => {console.log("no se pudo obtener la lista de upcoming events...!", err)});
	}, []);

	// if there is EXACTLY ONE, redirect to the upcoming evento page (so that)
	// else if than one, show the list so that one can be chosen
	// else (if none), display error message
	if (isLoaded) {
		if (upcomingEventos.length === 1) {
			navigate(`/rrpp/${upcomingEventos[0]._id}`);
		} else if (upcomingEventos.length > 1) {
			return (
				<>
					<Nav/>
					<h2 className="text-blue-300 text-xl text-center m-4">Proximos Eventos</h2>
				  <p className="text-gray-600 text-bold text-base text-center m-4">Seleccione un evento para extender invitaciones</p>

					<div className="text-center m-10">
						<ul>
						{ upcomingEventos.map(e => {
								return (<li key={e._id}><Link to={`/rrpp/${e._id}`}>{e.nombre}</Link></li>)
						})}
						</ul>
					</div>
				</>
			);
		} else {
			return (
				<>
					<Nav/>
					<div className="text-center">
						<p>No hay proximos eventos</p>
						<p className="text-xs">(Si se trata de un error, notifica al administrador)</p>
					</div>
				</>
			);
		}
	} else {
		return <Loading/>
	}
}

export default RRPP;

