import { useState } from 'react';
import axios from 'axios';

const NewInvitado = ({invitadoCI, setInvitadoCI, setInvitado}) => {
	//const [CI, setCI] = useState(invitadoCI);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");

	const saveNewInvitado = (e) => {
		e.preventDefault();

		axios.post('http://localhost:8000/api/invitado/new',
			{ci: invitadoCI, nombre, apellido})
			.then(res => {
				setInvitado(res.data.invitado)
			})
			.catch(err => console.log('error agregando invitado', err));
	}

	return (
		<form>
			<h2>Nuevo Invitado</h2>
			<input type="number" name="CI" value={invitadoCI} readOnly />
			<input type="text" name="nombre" placeholder="Nombre" value={nombre}
		         onChange={e => setNombre(e.target.value)} />
			<input type="text" name="apellido" placeholder="Apellido" value={apellido}
		         onChange={e => setApellido(e.target.value)} />
			<button onClick={e => setInvitadoCI("")}>Cancelar</button>
			<button onClick={e => saveNewInvitado(e)}>Cancelar</button>
		</form>
	);
}

export default NewInvitado;
