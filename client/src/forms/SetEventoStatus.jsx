import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles';

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
		<div className={styles.centeredDiv}>
			<label className="text-base"
							htmlFor="estado">Cambiar estado a </label>
			<select className={styles.input}
							name="estado"
							onChange={e => {setNuevoEstado(e.target.value)}}>
				<option value=""></option>
				{availableEstados.map(s => {
					return (
						<option key={s} value={s}>{s}</option>
					);
				})}
			</select>


			<div className="flex justify-between w-8/12 m-6">
        <button className={styles.button("red")}
          onClick={e => {navigate('/')} }>Cancelar</button>
        <button className={styles.button("green")}
          onClick={e => {nuevoEstado && changeEstado(e)}}>
          Cambiar
        </button>
      </div>
		</div>
	);
}

export default SetEventoStatus;
