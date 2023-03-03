import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from "@auth/useAuth";

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showInvalidLoginError, setShowInvalidLoginError] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const onSubmitHandler = (event) => {
		event.preventDefault();

		axios.post('http://localhost:8000/api/user/login',
			{email, password},
			{withCredentials: true})
			.then(res => {
				console.log(res);
				login().then(() => {
					//sessionStorage.setItem('token', JSON.stringify(userToken));
					navigate("/");
				});
			})
			.catch(err => {
				console.log(err);
				setShowInvalidLoginError(true);
			});
	}

	return (
		<div className="w-full max-w-xs justify-center">
			<h1>Login</h1>
			<hr />
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
		        onSubmit={onSubmitHandler}>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2"
		             htmlFor="email">
						Email
					</label>
					<input className={"shadow appearance-none border rounded"+
		                       "w-full py-2 px-3 text-gray-700 leading-tight"+
						               "sm:focus:outline-none focus:shadow-outline"}
		             id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2"
		             htmlFor="password">
						Password
					</label>
					<input className={"shadow appearance-none border border-red-500"+
						                "rounded w-full py-2 px-3 text-gray-700 mb-3"+
														"leading-tight focus:outline-none focus:shadow-outline"}
		             id="password" type="password"
		             onChange={(e) => setPassword(e.target.value)} /> 
				</div>
				<div className="flex items-center justify-between">
					<button type='submit'
		      	className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2"+
							         "px-4 rounded focus:outline-none focus:shadow-outline"}>
						Login
					</button>
					{showInvalidLoginError && <p className="text-red-500 text-xs italic">Invalid Email or Password</p> }
				</div>
			</form>
			<p className="text-center text-gray-500 text-xs">
				grIT 2023
			</p>

			<p className="text-center text-gray-500 text-xs">
				Todos los derechos reservados
			</p>
		</div>
	);
}

export default Login;
//
