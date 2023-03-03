import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetEventoStatus = ({evento}) => {
	const [nuevoEstado, setNuevoEstado] = useState("");
	const navigate = useNavigate();

	const availableEstados = [
		"Upcoming", "Ongoing", "Finished","Cancelled"]
		.filter(e => e!=evento.estado);

	const changeEstado = (e) => {
		//const eventoModificado = {...evento, estado: nuevoEstado};
		axios.post('http://localhost:8000/api/evento/edit',
			{id: evento._id, estado: nuevoEstado})
			.then(res => {
				navigate('/');
			})
			.catch(err => {
				console.log("error al modificar estado", err);
			});
	}

	return (
		<>
			<p>Cambiar estado a:</p>
			<select onChange={e => {setNuevoEstado(e.target.value)}}>
				<option value=""></option>
				{availableEstados.map(s => {
					return (
						<option key={s} value={s}>{s}</option>
					);
				})}
			</select>

			<button onClick={e => {navigate('/')}}>Cancelar</button>

			<button onClick={e => {nuevoEstado && changeEstado(e)}}>Cambiar</button>
		</>
	);
}

export default SetEventoStatus;
