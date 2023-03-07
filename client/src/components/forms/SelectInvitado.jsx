import { useState } from 'react';
import axios from 'axios';
import styles from '@/styles';

const SelectInvitado = ({selectedInvitacion, setSelectedInvitacion}) => {
	const invitacionId = selectedInvitacion._id;
	const nombreInvitado = selectedInvitacion.invitado.nombre;
	const apellidoInvitado = selectedInvitacion.invitado.apellido;
	const CI = selectedInvitacion.invitado.CI;
	const RRPP = selectedInvitacion.rrpp.nombre + " " + selectedInvitacion.rrpp.apellido;
	//const isFreePass = selectedInvitacion.

	const markInvitacionAsUsed = (invitacion) => {
		axios.put(`http://localhost:8000/api/invitacion/use/${invitacion._id}`)
			.then(res => {
				console.log("ok!");
				setSelectedInvitacion({});
			})
			.catch(err => console.log("no se pudo marcar como usada!", err));

		//return marked;
	}

	return (
		<div className={styles.centeredDiv+"m-8"}>
			<div className={styles.centeredDiv}>
				<p className="text-center text-xl">{nombreInvitado} {apellidoInvitado}</p>
				<p className="text-base text-center">CI: {CI}</p>
				{selectedInvitacion.isFreePass && 
					<p className="text-green-300 font-bold text-center m-4 text-3xl">
						FREE PASS
					</p>}
				<p>Invitado por: {RRPP}</p>
			</div>
		
			<div className="flex justify-between w-8/12 m-5 flex-row">
				<button className={styles.button("red")}
					onClick={e => setSelectedInvitacion({})}>Cancelar</button>
				<button className={styles.button("green")}
					onClick={e => {markInvitacionAsUsed(selectedInvitacion)}}>
					Permitir acceso
				</button>
			</div>
		</div>
	);
}

export default SelectInvitado;
/*
				<table className="text-center table-auto">
					<tbody>
						<tr>
							<th className="px-2 py-1 text-left">CI</th>
							<td className="px-2 py-2">{CI}</td>
						</tr>
						<tr>
							<th className="px-2 py-1 text-left">Nombre</th>
							<td>{nombreInvitado}</td>
						</tr>
						<tr>
							<th className="px-2 py-1 text-left">Apellido</th>
							<td>{apellidoInvitado}</td>
						</tr>
						<tr>
							<th className="px-2 py-1 text-left">RRPP</th>
							<td>{RRPP}</td>
						</tr>
					</tbody>
				</p>

*/
