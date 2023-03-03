import { useState } from 'react';
//import { useNavigate } from 'react-router';
import axios from 'axios';

const RegisterForm = () => {
	const [inputs, setInputs] = useState({});
	const [validationErrors, setValidationErrors] = useState([]);
	//const navigate = useNavigate();

	const fields = [
		{name: "firstName", label: "First Name", type: "text"},
		{name: "lastName", label: "Last Name", type: "text"},
		{name: "email", label: "Email", type: "email"},
		{name: "password", label: "Password", type: "password"},
		{name: "confirmPassword", label: "Confirm Password", type: "password"},
	];

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}));
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		axios.post('http://localhost:8000/api/user/register',
			{...inputs})
			.then(res => {
				console.log(res)
				//navigate('/movies');
				setInputs([]);
			})
			.catch(err => {
				const errorsdata = err.response.data.error.errors;
				//console.log(errorsdata);
				setValidationErrors(Object.keys(errorsdata).map(k => errorsdata[k].message));
			});
	}

	return (
		<form onSubmit={handleSubmit}>
			{validationErrors.map(err => <p key={err}>{err}</p>)}
			{fields.map((field) => {
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
			<input type="submit" value="Submit" />
		</form>
	)
}

export default RegisterForm;

