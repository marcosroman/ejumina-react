import axios from 'axios';
import { useState } from 'react';

const NewEventoForm = ({setEvento}) => {
	const [nombre, setNombre] = useState("");
	const [validationError, setValidationError] = useState("");

	const crearEvento = e => {
		e.preventDefault();

		if (nombre) {
			axios.post('http://localhost:8000/api/evento/new',
				{nombre, estado: "Upcoming"})
				.then(res => {
					setEvento(res.data.evento);
				})
				.catch(err => {
					console.log("error creando evento", err);
				});
		}
		else {
			setValidationError("Nombre del evento?");
		}
	}

	return (
		<div className="flex items-center justify-center flex-col">
				<input className="rounded-lg border-solid border-2 border-sky-200 m-6 text-center"
								type="text" name="nombre" value={nombre}
								placeholder="Nombre del evento"
								onChange={e => {setNombre(e.target.value)}}/>
		{validationError &&
              <p className="text-xs text-red-500">
                {validationError}
              </p>}

				<button className="border-solid border-2 border-green-100 bg-green-300 rounded px-2 py-1"
								onClick={e => {crearEvento(e)}}>Crear</button>
		</div>
	);
}

export default NewEventoForm;
			//<form>
			//</form>
//				<input className="rounded-lg border-solid border-2 border-sky-200 m-2 text-center"
//								 type="datetime-local" />
//	<input type="checkbox" name="toggleDate" /> <label htmlFor="toggleDate">No se todavia</label>


