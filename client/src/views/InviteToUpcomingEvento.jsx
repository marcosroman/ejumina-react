import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Nav from '@layouts/Nav';

import SearchInvitado from '@forms/SearchInvitado';
import NewInvitado from '@forms/NewInvitado';
import Invite from '@forms/Invite';

const InviteToUpcomingEvento = () => {
	const [evento, setEvento] = useState({});
	const [invitaciones, setInvitaciones] = useState({});
	const [invitado, setInvitado] = useState({});
	const [invitadoCI, setInvitadoCI] = useState("");
	const [cantMisInvitaciones,setCantMisInvitaciones] = useState(0);
	const [cantRemainingFreePasses,setCantRemainingFreePasses] = useState(0);
	const [cantFreePassesAsignados,setCantFreePassesAsignados] = useState(0);
	const { upcomingEventoId } = useParams();

	//const remainingFreePasses = 10; // por ahora...
	//const givenFreePasses = 20;
	//const totalInvitaciones = 98;
	const myRRPPId="6404ccbde6269d6dd7870e64";

	useEffect(() => {
		// lo primero es fetch info de mis invitaciones al evento
		// (de esa forma voy a poder saber cuantas ya extendi, cuantos free passes me quedan, etc)

		// usar useeffect para obtener numero de free passes disponible
		// (idealmente tambien mostrar el nombre del evento y otros datos...!)
		axios.get(`http://localhost:8000/api/evento/id/${upcomingEventoId}`)
			.then(res => {
				const thisEvento=res.data.evento;
				setEvento(thisEvento);
				// y buscamos la info del evento (incluye invitados, etc)
				axios.get(`http://localhost:8000/api/invitacion/evento/${upcomingEventoId}`)
					.then(res => {
						//console.log('ok!',res);
						const invitaciones = res.data.invitaciones;
						setInvitaciones(invitaciones);
						const misInvitaciones = invitaciones.filter(i => i.rrpp._id === myRRPPId);
						const cantMisInvitaciones = misInvitaciones.length;
						const misFreePasses = misInvitaciones.filter(i=>i.isFreePass);
						const cantMisFreePasses = misFreePasses.length;
						const cantMisFreePassesAsignados = thisEvento.freePasses.filter(a=>a.rrpp === myRRPPId)[0].cantidad;
						setCantMisInvitaciones(cantMisInvitaciones);
						setCantRemainingFreePasses(cantMisFreePassesAsignados-cantMisFreePasses);
						setCantFreePassesAsignados(cantMisFreePassesAsignados);
						console.log("tengo",cantMisInvitaciones,"invitaciones (en total), de las cuales ",cantMisFreePasses, "son free passes...");
						console.log("me fueron asignados",cantMisFreePassesAsignados);
					})
					.catch(err => {
						console.log('error al obtener detalles del evento', err);
					})
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

				<div className="text-center mt-3">
					<p className="text-xs">Mis invitados: {cantMisInvitaciones}</p>
					<p className="text-xs">Free passes restantes: {cantRemainingFreePasses}/{cantFreePassesAsignados}</p>
				</div>
				{invitadoCI && invitado._id ?
					<Invite eventoId={upcomingEventoId}
									invitado={invitado}
									setInvitado={setInvitado}
									setInvitadoCI={setInvitadoCI}
									cantRemainingFreePasses={cantRemainingFreePasses} />
					: invitadoCI ?
						<NewInvitado invitadoCI={invitadoCI}
														setInvitadoCI={setInvitadoCI}
														setInvitado={setInvitado} />
						: <SearchInvitado setInvitadoCI={setInvitadoCI} 
															setInvitado={setInvitado}
															invitaciones={invitaciones} />}
			</div>
		</>
	);
};

export default InviteToUpcomingEvento;
