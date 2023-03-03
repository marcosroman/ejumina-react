//import { AuthConsumer } from '@auth/useAuth';
//<AuthConsumer>
//</AuthConsumer>
//
import { useState, useEffect } from 'react';
import SearchAndShowInvitados from '@forms/SearchAndShowInvitados';
import SelectInvitado from '@forms/SelectInvitado';
import Loading from '@views/Loading';
import axios from 'axios';

import Nav from '@layouts/Nav'

const Bouncer = () => {
	const [isLoaded,setIsLoaded] = useState(false);
	const [selectedInvitacion, setSelectedInvitacion] = useState({});
	const [ongoingEventos,setOngoingEventos] = useState({});

	useEffect(() => {
		// get ongoing eventos...
		axios.get("http://localhost:8000/api/evento/ongoing")
			.then(res => {
				setOngoingEventos(res.data.eventos);
				setIsLoaded(true);
			})
			.catch(err => {
				console.log("error al descargar eventos!",err);
			});
	}, []);

	// if there is EXACTLY ONE, then get the relevant data (id and name are enough i guess)
		// then send ongoingEventos via props to SearchAndShowInvitees component, so that it allows for search and display    lgo get list of invitados for this event (mostrar como tachados los que ya entraron!)
	// else:
		// say either: (there are no ongoing events | there's more than one ongoing event), please contact an admin to fix this if this is an error!

	if (isLoaded) {
		if (ongoingEventos.length === 1) {
			const eventoName = ongoingEventos[0].nombre;
			const eventoId = ongoingEventos[0]._id;

			return (
				<div>
					<Nav/>
					<div className="flex items-center justify-center flex-col">
						<h1 className="text-blue-500 text-bold text-xl">{eventoName}</h1>
						{ selectedInvitacion._id ? 
							<SelectInvitado selectedInvitacion={selectedInvitacion}
							                setSelectedInvitacion={setSelectedInvitacion}/>
							: <SearchAndShowInvitados eventoId={eventoId}
							                          selectedInvitacion={selectedInvitacion}
							                          setSelectedInvitacion={setSelectedInvitacion}/>
						}
					</div>
				</div>
			);
		} else if (ongoingEventos.length > 1) {
			return (
				<>
					<Nav/>
					<p>Existe mas de un evento ocurriendo en simultaneo.</p>
					<p>Consulte con un administrador</p>
				</>
			);
		} else {
			return (
				<>
					<Nav/>
					<p>No hay eventos ocurriendo actualmente.</p>
					<p>(Si esto es un error, consulte con un administrador)</p>
				</>
			);
		}
	} else {
		return <Loading />
	}
}

export default Bouncer;
