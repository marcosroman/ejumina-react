import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchAndShowInvitados = ({eventoId, selectedInvitacion, setSelectedInvitacion}) => {
	const [searchInput, setSearchInput] = useState("");
	const [invitaciones, setInvitaciones] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:8000/api/invitacion/evento/${eventoId}`)
			.then(res => {setInvitaciones(res.data.invitaciones);})
			.catch(err => {alert(err)});
	}, [selectedInvitacion]);

	const matchingEntries = (invitaciones, searchString) =>	
		invitaciones.filter(i => {
			const invitadoCI = i.invitado.CI.toString();
			const invitadoNombreApellido = i.invitado.nombre
				                             + " " + i.invitado.apellido;
			const invitadoNombreApellidoLC = invitadoNombreApellido.toLowerCase();
			const searchStringLC = searchString.toLowerCase();

			return invitadoCI.includes(searchStringLC)
						 || invitadoNombreApellidoLC.includes(searchStringLC);
		});

	return (
		<div className="flex items-center justify-center flex-col">
			<input className="rounded-lg border-solid border-2 border-sky-200 m-10 text-center"
						 type="text" name="search" placeholder="Buscar invitado"
						 value={searchInput}
						 onChange={e => setSearchInput(e.target.value)} />

			{ searchInput.length>0 && (
					matchingEntries(invitaciones,searchInput).length>0 ? (
						<table className="table w-full table-auto border-collapse">
							<thead className="table-header-group border">
								<tr className="table-row">
									<th className="table-cell text-left border px-2 py-1 bg-blue-100">Nombre</th>
									<th className="table-cell text-left border px-2 py-1 bg-blue-100">CI</th>
								</tr>
							</thead>
							<tbody className="table-row-group border">
								{ matchingEntries(invitaciones, searchInput)
										.map(invitacion => {
											const invitacionId = invitacion._id;
											const invitadoNombreApellido = invitacion.invitado.nombre +
												" " + invitacion.invitado.apellido;
											const invitadoCI = invitacion.invitado.CI;
											const invitacionIsUsada = invitacion.isUsada;
											const rowStyle = "table-cell border px-2 py-2 " +
												(invitacionIsUsada ? "line-through text-gray-400" : "");

											return (
												<tr className="table-row" 
														key={invitacionId}>
													<td className={rowStyle}
												      onClick={e =>
																 {!invitacionIsUsada && 
																		setSelectedInvitacion(invitacion)}}>
														{invitadoNombreApellido}
													</td>
													<td className={rowStyle}>
														{invitadoCI}
													</td>
												</tr>
											);
										})
								}
							</tbody>
						</table>
					) : <p>Sin resultados</p>
				)}
			</div>
		);
	}

export default SearchAndShowInvitados;
