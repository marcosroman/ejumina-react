import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '@/styles';

const SelectUpcomingEvento = ({setEvento,
															 showOnlyWithoutAssignedFreePasses}) => {
	const [eventos, setEventos] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8000/api/evento/upcoming')
			.then(res => {
				if (showOnlyWithoutAssignedFreePasses) {
					setEventos(res.data.eventos.filter(e => e.freePasses.length === 0));
				} else {
					setEventos(res.data.eventos);
				}
			})
			.catch(err => {
				console.log("error fetching eventos", err);
			});
	},[]);

	return (
		<div className={styles.centeredDiv}>
			<select className={styles.input}
							onChange={e => {e.target.value && setEvento(eventos[e.target.value])}}>
				<option value="">Seleccionar evento proximo...</option>
				{eventos.map((evento,index) => {
					return (
						<option key={evento._id} value={index}>
							{evento.nombre}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default SelectUpcomingEvento;
