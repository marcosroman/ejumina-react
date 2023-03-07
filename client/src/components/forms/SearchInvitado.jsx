import axios from "axios";
import { useState } from 'react';

const SearchInvitado = ({setInvitadoCI, setInvitado, invitaciones}) => {
	const [input, setInput] = useState("");
	const [isAlreadyInvited, setIsAlreadyInvited] = useState(false);

	const findInvitado = (e) => {
		e.preventDefault();
		
		axios.get(`http://localhost:8000/api/invitado/ci/${input}`)
			.then(res => {
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
	}

	return (
		<form className="flex items-center justify-center flex-col">
			<input className="rounded-lg border-solid border-2 border-sky-200 m-10 text-center"
						 type="number" name="CI" placeholder="Ingrese CI de invitadx"
		         value={input}
		         onChange={e => setInput(e.target.value)}/>
			{isAlreadyInvited && <p className="text-red-500">Ya fue invitadx</p>}
			<button className="border-solid border-2 border-green-100 bg-green-300 rounded px-2 py-1"
			 				onClick={e => {findInvitado(e)}}>
				Buscar
			</button>
		</form>
	)
}

export default SearchInvitado;

