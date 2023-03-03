// seria impre si como admin todo lo que hago es generar un KEY dando un rol
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewUserForm = () => {
	const [inputs, setInputs] = useState({});
	//const [validationErrors, setValidationErrors] = useState([]);
	const navigate = useNavigate();

	const simpleFields = [
		{name: "nombre", label: "Nombre", type: "text"},
		{name: "apellido", label: "Apellido", type: "text"},
		{name: "username", label: "UserName", type: "text"},
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
			{...inputs})
			.then(res => {
				console.log(res)
				//navigate('/movies');
				setInputs([]);
				navigate('/');
			})
		/*
			.catch(err => {
				const errorsdata = err.response.data.error.errors;
				//console.log(errorsdata);
				setValidationErrors(Object.keys(errorsdata).map(k => errorsdata[k].message));
			});
			*/
	}

	return (
		<form onSubmit={handleSubmit}>
			{/*validationErrors.map(err => <p key={err}>{err}</p>)*/}
			{simpleFields.map((field) => {
				return (
					<label key={field.name}>{field.label}
						<input name={field.name}
								   type={field.type}
					         value={inputs[field.name] || ""}
					         onChange={e=>handleChange(e)}
									 className="border-black " />
					</label>
				);
			})}
		 <label>Rol
        <select name="rol"
                value={inputs["rol"] || ""}
                onChange={(e)=>handleChange(e)}>
          {["","RRPP","Bouncer","Admin"].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

			<input type="submit" value="Submit" />
		</form>
	)
}

export default NewUserForm;
