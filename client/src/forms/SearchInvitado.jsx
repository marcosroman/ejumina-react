import axios from "axios";
import { useState } from 'react';

const SearchInvitado = ({setInvitadoCI, setInvitado, invitaciones}) => {
	const [input, setInput] = useState("");
	const [isAlreadyInvited, setIsAlreadyInvited] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");


	const isNumber = (n) => !isNaN(+n);

	const findInvitado = (e) => {
		e.preventDefault();
		
		setErrorMsg("");
		
		if(isNumber(input) && Number(input) > 2000000) {
			axios.get(`http://localhost:8000/api/invitado/ci/${input}`)
				.then(res => {
					// aplicamos primero la validacion aca (que ya esta en la base de datos, pero lo hacemos de nuevo aca para evitar que se intente ingresar un CI que luego arrojara error de validacion...)
					if (res.data.invitado !== null) { // si el invitado ya esta registrado en la base de datos...
						const thisInvitado = res.data.invitado;

						console.log(invitaciones.map(i=>i.invitado.CI === Number(input)));
						// nos aseguramos de que la persona no fue invitada todavia (quizas por otro rrpp?)
						if (invitaciones.filter(i => i.invitado.CI === Number(input)).length === 0) {
							setIsAlreadyInvited(false);
							setInvitado(thisInvitado);
							setInvitadoCI(input);
						} else {
							console.log("ya fue invitado!");
							setInvitado("");
							setIsAlreadyInvited(true);
						}
					} else {
						setInvitadoCI(input);
					}
				})
				.catch(err => {
					console.log("no se puede buscar invitado....", err);
				});
			//} else if (input === "") {
			//	setErrorMsg("CI?!");
			} else if (input.length>0) {
				setErrorMsg("CI invalido");
			}

	}

	return (
		<form className="flex items-center justify-center flex-col">
			<input className="rounded-lg border-solid border-2 border-sky-200 m-6 text-center"
						 type="number" name="CI" placeholder="Ingrese CI de invitadx"
		         value={input}
		         onChange={e => setInput(e.target.value)}/>
			{isAlreadyInvited && <p className="text-red-500 m-3">Ya fue invitadx</p>}
			{errorMsg && <p className="text-red-500 m-3">{errorMsg}</p>}
			<button className="border-solid border-2 border-green-100 bg-green-300 rounded px-2 py-1"
			 				onClick={e => {findInvitado(e)}}>
				Buscar
			</button>
		</form>
	)
}

export default SearchInvitado;

