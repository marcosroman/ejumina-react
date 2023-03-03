import { useState } from 'react';
import axios from 'axios';

const SelectInvitado = ({selectedInvitacion, setSelectedInvitacion}) => {

	const invitacionId = selectedInvitacion._id;
	const nombreInvitado = selectedInvitacion.invitado.nombre;
	const apellidoInvitado = selectedInvitacion.invitado.apellido;
	const CI = selectedInvitacion.invitado.CI;
	const RRPP = selectedInvitacion.rrpp.nombre + " " + selectedInvitacion.rrpp.apellido;
	//const isFreePass = selectedInvitacion.

	const markInvitacionAsUsed = (invitacion) => {
		//let marked = false;

		axios.put(`http://localhost:8000/api/invitacion/use/${invitacion._id}`)
			.then(res => {
				console.log("ok!");
			})
			.catch(err => console.log("no se pudo marcar como usada!", err));

		//return marked;
	}

	return (
		<div>
			<div className="flex justify-center align-middle flex-col w-8/12">
				<table>
					<tbody>
						<tr>
							<th>CI</th>
							<td>{CI}</td>
						</tr>
						<tr>
							<th>Nombre</th>
							<td>{nombreInvitado}</td>
						</tr>
						<tr>
							<th>Apellido</th>
							<td>{apellidoInvitado}</td>
						</tr>
						<tr>
							<th>RRPP</th>
							<td>{RRPP}</td>
						</tr>
					</tbody>
				</table>
				{selectedInvitacion.isFreePass && <p className="text-green-300 font-bold">FREE PASS</p>}
			</div>
		
			<div className="flex justify-between">
				<button className="border-solid border-2 border-black bg-red-200"
					onClick={e => setSelectedInvitacion({})}>Cancelar</button>
				<button className="border-solid border-2 border-black bg-green-200"
					onClick={e => {
						markInvitacionAsUsed(selectedInvitacion);
						setSelectedInvitacion({});
					}}>
					Permitir acceso
				</button>
			</div>
		</div>
	);
}

export default SelectInvitado;

