import axios from 'axios';
import { useState, useEffect } from 'react';

const SelectEvento = ({setEvento}) => {
	const [eventos, setEventos] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8000/api/evento/all')
			.then(res => {
				setEventos(res.data.eventos);
			})
			.catch(err => {
				console.log("error fetching eventos", err);
			});
	},[]);

	return (
		<select onChange={e => {setEvento(eventos[e.target.value])}}>
			<option value="">Seleccionar evento...</option>
			{eventos.map((evento,index) => {
				return (
					<option key={evento._id} value={index}>
						{evento.nombre} ({evento.estado})
					</option>
				);
			})}
		</select>
	);
}

export default SelectEvento;
