import { useState } from 'react';
import axios from 'axios';
import styles from '@/styles';

const NewInvitado = ({invitadoCI, setInvitadoCI, setInvitado}) => {
	//const [CI, setCI] = useState(invitadoCI);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");

	const saveNewInvitado = (e) => {
		e.preventDefault();

		axios.post('http://localhost:8000/api/invitado/new',
			{CI: invitadoCI, nombre, apellido})
			.then(res => {
				setInvitado(res.data.invitado)
			})
			.catch(err => console.log('error agregando invitado', err));
	}

	return (
		<form onSubmit={saveNewInvitado} className={styles.centeredDiv}>
			<div className={styles.centeredDiv+"m-8 w-8/12"}>
				<h2 className="font-bold m-2">Nuevo Invitado</h2>
				<p>CI: {invitadoCI}</p>
				<input className={styles.input}
							 type="text" name="nombre" placeholder="Nombre" value={nombre}
							 onChange={e => setNombre(e.target.value)} />
				<input className={styles.input}
							 type="text" name="apellido" placeholder="Apellido" value={apellido}
							 onChange={e => setApellido(e.target.value)} />
			</div>

			<div className="flex align-center w-8/12 flex-row m-6 justify-between">
				<button className={styles.button("red")}
								onClick={e => setInvitadoCI("")}>Cancelar</button>

				<button className={styles.button("green")} 
								onClick={e => saveNewInvitado(e)}>Registrar</button>
			</div>

		</form>
	);
}

export default NewInvitado;

		//flex justify-between w-8/12 m-6 flex-row
