import { useState } from 'react';
import axios from 'axios';
import styles from '@/styles';

const NewInvitado = ({invitadoCI, setInvitadoCI, setInvitado}) => {
	//const [CI, setCI] = useState(invitadoCI);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [errorNombre, setErrorNombre] = useState("");
	const [errorApellido, setErrorApellido] = useState("");

	const saveNewInvitado = (e) => {
		e.preventDefault();

		setErrorNombre("");
		setErrorApellido("");

		axios.post('http://localhost:8000/api/invitado/new',
			{CI: invitadoCI, nombre, apellido})
			.then(res => {
				setInvitado(res.data.invitado);
			})
			.catch(err => {
				console.log('error agregando invitado', err)

				const errors = err.response.data.error.errors;
        const errKeys = Object.keys(errors);
				/*
        errKeys.map(key => {
          const errMsg = errors[key].message;
          console.log(key,errors[key].message);
          setValidationErrors(values => ({...values, [key]: errMsg}));
        })
				*/
				if (errKeys.includes("nombre")) {
					setErrorNombre("Nombre?");
				}
				if (errKeys.includes("apellido")) {
					setErrorApellido("Apellido?");
				}
			});
	}

	return (
		<form onSubmit={saveNewInvitado} className={styles.centeredDiv+" my-auto"}>
			<div className={styles.centeredDiv+"mx-8 my-auto w-8/12 "}>
				<h2 className="font-bold m-2">Nuevo Invitado</h2>
				<p>CI: {invitadoCI}</p>
				<div>
				<input className={styles.input}
							 type="text" name="nombre" placeholder="Nombre" value={nombre}
							 onChange={e => setNombre(e.target.value)} />
				{errorNombre &&
                  <p className="text-xs text-red-500 text-center">
                    {errorNombre}</p>}

				</div>
				<div>
				<input className={styles.input}
							 type="text" name="apellido" placeholder="Apellido" value={apellido}
							 onChange={e => setApellido(e.target.value)} />
				{errorApellido &&
                  <p className="text-xs text-red-500 text-center">
                    {errorApellido}</p>}
				</div>
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
