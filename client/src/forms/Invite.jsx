import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useAuth from '@auth/useAuth';
import styles from '@/styles';

const Invite = ({eventoId, setInvitadoCI, invitado, setInvitado, cantRemainingFreePasses}) => {
	const navigate = useNavigate('/');
	const { userId } = useAuth();
	
	//const hardCodedRRPPId = "6404ccbde6269d6dd7870e64";


	styles.freePassButton = "border-solid border-2 bg-gradient-to-r " +
													"from-violet-500 to-fuchsia-50 border-purple-100 " + 
													"rounded px-2 py-1"

	const saveInvite = ({isFreePass}) => {
		axios.post('http://localhost:8000/api/invitacion/new',
			{rrpp: userId, invitado: invitado._id,
				evento: eventoId, isFreePass})
			.then(invitacion => {
				// faltaria aca un mensajito de 2 segundos que me diga que esta todo ok
				navigate('/');
			})
			.catch(err => {
				console.log('no se pudo invitar:', err)
			})
	}

	return (
		<>
		<div className={styles.centeredDiv+"m-6"}>

			<p className="text-xs m-4">Invitar a</p>
			<p>{invitado.nombre} {invitado.apellido}</p>
			<p className="text-xs">CI: {invitado.CI}</p>

		</div>
			
		<div className="flex justify-between w-8/12 m-6 flex-row">
			<button className="border-solid border-2 border-red-100 bg-red-300 rounded px-2 py-1"
							onClick={e => {setInvitado({}); setInvitadoCI("");}}>
				Cancelar
			</button>
			{ (cantRemainingFreePasses>0) &&
				<button className={styles.freePassButton}
								onClick={e => saveInvite({isFreePass: true})}>
					Free Pass</button> }
			<button className="border-solid border-2 border-green-100 bg-green-300 rounded px-2 py-1"
							onClick={e => saveInvite({isFreePass: false})}>
				Invitar
			</button>
		</div>
		</>
	);
}

export default Invite;
