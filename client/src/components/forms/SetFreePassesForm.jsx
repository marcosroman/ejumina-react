import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@views/Loading';

const SetFreePassesForm = ({evento}) => {
	const [rrpps, setRrpps] = useState([]);
	const [loaded, setLoaded] = useState(false);
	//const [freePasses, setFreePasses] = useState([])
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:8000/api/user/rrpp/active/all')
			.then(res => {
				// return active rrpps adding amount of free passes
				setRrpps(res.data.rrpp.map(r => {
					return {...r, freePasses: 0};
				}));
				setLoaded(true);
			})
			.catch(err => {
				console.log("error al obtener lista de rrpps",err);
			});
	},[]);

	const submitFreePasses = (e) => {
		e.preventDefault();
		const freePasses =
			rrpps.filter(r => r.freePasses>0)
				.map(r => {
					return {rrpp: r._id, cantidad: Number(r.freePasses)}
				});
		//console.log(FreePasses);
		if(freePasses.length>0) {
			axios.post('http://localhost:8000/api/evento/setfreepasses',
				{eventoId: evento._id, freePasses})
				.then(res => {
					//alert('ok!!!!');
					//navigate to main
					navitage('/');
				})
				.catch(err => {
					console.log("error agregando free passes", err);
				})
		}

	}

	// vamos a listar todos los rrpps habilitados... y al lado de cada uno le dejamos poner free passes
	if (loaded) {
		return ( 
			<div className="flex items-center justify-center flex-col">

				<h2 className="text-blue-500 text-bold text-xl">{evento.nombre}</h2>
				<p className="text-gray-600 text-bold text-base">Asignar Free Passes a RRPPs</p>

				<table className="table-auto m-5">
					{rrpps.map((u,index) => {
						return (
							<tr key={u._id}>
								<td>{u.nombre} {u.apellido}</td>
								<td>
									<input className="rounded-lg border-solid border-2 border-sky-200 m-1 text-center"
												 name={u._id} type="number" min="0" value={u.freePasses}
												 onChange={e => {
													 const rrppsCopy = [...rrpps];
													 rrppsCopy[index].freePasses = e.target.value;
													 setRrpps(rrppsCopy);
												 }} />
								</td>
							</tr>
						);
					})}
				</table>
				
				<div className="flex justify-between w-4/12">
					<button className="border-solid border-2 border-red-100 bg-red-300 rounded px-2 py-1"
									onClick={e => {navigate('/');}}>Cancelar</button>

					<button className="border-solid border-2 border-green-100 bg-green-300 rounded px-2 py-1"
									onClick={submitFreePasses}>Guardar</button>
				</div>
			</div>
		);
	} else {
		<Loading/>
	}
}

export default SetFreePassesForm;
