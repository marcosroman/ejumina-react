import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Nav from '@layouts/Nav';

import SearchInvitado from '@forms/SearchInvitado';
import NewInvitado from '@forms/NewInvitado';
import Invite from '@forms/Invite';

const InviteToUpcomingEvento = () => {
	const [evento, setEvento] = useState({});
	const [invitado, setInvitado] = useState({});
	const [invitadoCI, setInvitadoCI] = useState("");
	const { upcomingEventoId } = useParams();
	const remainingFreePasses = 10; // por ahora...
	const givenFreePasses = 20;

	useEffect(() => {
	// usar useeffect para obtener numero de free passes disponible
		//
	// (idealmente tambien mostrar el nombre del evento y otros datos...!)
		axios.get(`http://localhost:8000/api/evento/id/${upcomingEventoId}`)
			.then(res => {
				setEvento(res.data.evento);
			})
			.catch(err => {
				console.log(err);
			});
	},[]);
	
	// la idea es: si no hay ni CI ni id, paso los getters a un search form....
		// el search form busca... si encuentra el invitado, setea
	// si hay CI pero no id, voy al NewInvitadoForm
	// si hay CI e ID, me va a mostrar los datos del usuario y me va a dar botones
	//   para elegir free pass, normal pass o cancelas
	return (
		<>
			<Nav/>
			<div className="flex items-center justify-center flex-col">
				<h1 className="text-blue-500 text-bold text-xl">{evento.nombre}</h1>
				<p className="text-xs mt-2">Free passes disponibles {remainingFreePasses}/{givenFreePasses}</p>
				{invitadoCI && invitado._id ?
					<Invite eventoId={upcomingEventoId}
									invitado={invitado}
									setInvitado={setInvitado}
									setInvitadoCI={setInvitadoCI} />
					: invitadoCI ?
						<NewInvitado invitadoCI={invitadoCI}
														setInvitadoCI={setInvitadoCI}
														setInvitado={setInvitado} />
						: <SearchInvitado setInvitadoCI={setInvitadoCI} 
															setInvitado={setInvitado} />
				}
			</div>
		</>
	);
};

export default InviteToUpcomingEvento;
