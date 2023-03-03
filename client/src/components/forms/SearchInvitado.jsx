import axios from "axios";
import { useState } from 'react';

const SearchInvitado = ({setInvitadoCI, setInvitado}) => {
	const [input, setInput] = useState("");

	const findInvitado = (e) => {
		e.preventDefault();

		axios.get(`http://localhost:8000/api/invitado/ci/${input}`)
			.then(res => {
				if (res.data.invitado !== null) {
					setInvitado(res.data.invitado);
				}
				setInvitadoCI(input);
			})
			.catch(err => {
				console.log("no se puede buscar invitado....", err);
			});
	}

	return (
		<form className="flex items-center justify-center flex-col">
			<input className="rounded-lg border-solid border-2 border-sky-200 m-10 text-center"
						 type="number" name="CI" placeholder="CI" value={input}
		         onChange={e => setInput(e.target.value)}/>
			<button className="border-solid border-2 border-green-100 bg-green-300 rounded px-2 py-1"
			 onClick={e => {findInvitado(e)}}>Buscar</button>
		</form>
	)
}

export default SearchInvitado;

