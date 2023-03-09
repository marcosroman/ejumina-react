import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@views/Loading';

import styles from '@/styles';

const NewRegisterWithToken = () => {
	const [inputs, setInputs] = useState({});
	const [isValidToken, setIsValidToken] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [rol, setRol] = useState("");
	//const [validationErrors, setValidationErrors] = useState([]);
	const navigate = useNavigate();
	const {token} = useParams();

	useEffect(() => {
		getTokenInfo();
	},[]);

	const getTokenInfo = (e) => {
		axios.get('http://localhost:8000/api/user/token/'+token)
			.then(res => {
				setIsValidToken(true);
				setIsLoaded(true);
				setRol(res.data.token.rol);
			})
			.catch(err => {
				navigate('/invalidtoken');
			})
	}


	const simpleFields = [
		{name: "nombre", label: "Nombre", type: "text"},
		{name: "apellido", label: "Apellido", type: "text"},
		{name: "CI", label: "CI", type: "number"},
		{name: "password", label: "Password", type: "password"},
		{name: "confirmPassword", label: "Confirmar Password", type: "password"},
	];

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}));
		//alert(name+"  -  "+value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);

		axios.post('http://localhost:8000/api/user/register',
			{...inputs,rol})
			.then(res => {
				console.log(res)
				//navigate('/movies');
				setInputs([]);

				axios.get('http://localhost:8000/api/user/usetoken/'+token)
					.then(()=>{console.log('used token',token)})
					.catch((err)=> {console.log('error using token', token)});

				if(rol==="Admin") {
					navigate('/admin');
				} else if (rol==="Bouncer") {
					navigate('/bouncer');
				} else {
					navigate('/rrpp');
				}
			})
		/*
			.catch(err => {
				const errorsdata = err.response.data.error.errors;
				//console.log(errorsdata);
				setValidationErrors(Object.keys(errorsdata).map(k => errorsdata[k].message));
			});
			*/
	}

	if (!isLoaded) {
		return <Loading/>
	} else {
		return (
			<form onSubmit={handleSubmit}>
				<div className={styles.centeredDiv}>
					<table className="m-6">
					<tbody>
					{/*validationErrors.map(err => <p key={err}>{err}</p>)*/}
					{simpleFields.map((field) => {
						return (
							<tr key={field.name}>
								<td className="text-right">
									<label htmlFor={field.name}>{field.label}</label>
								</td>

								<td>
									<input className={styles.input}
												 name={field.name}
												 type={field.type}
												 value={inputs[field.name] || ""}
												 onChange={e=>handleChange(e)} />
								</td>
							</tr>
						);
					})}

					<tr key={"rol"}>
						<td className="text-right">
							<label>Rol</label>
						</td>

						<td className="font-bold">
							<p className="font-bold">{rol}</p>						
						</td>
					</tr>
					</tbody>
					</table>

					<input className={styles.button('green')} 
								 type="submit" value="Registrarme"/>
				</div>
			</form>
		)
	}
}

export default NewRegisterWithToken;

