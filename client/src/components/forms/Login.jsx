import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from "@auth/useAuth";
import styles from "@/styles";
import appicon from "@/static/appicon.png";

const Login = () => {
	const [CI, setCI] = useState('');
	const [password, setPassword] = useState('');
	const [showInvalidLoginError, setShowInvalidLoginError] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const loginHandler = (event) => {
		event.preventDefault();

    axios.post('http://localhost:8000/api/user/login',
			{ CI, password },
			{ withCredentials: true })
      .then((response) => {
				if (response.data.rol === "Admin") {
					navigate('/admin');
				}
				else if (response.data.rol === "Bouncer") {
					navigate('/bouncer');
				} else {
					navigate('/rrpp');
				}
			})
      .catch(err => {
				console.log(err);
				setShowInvalidLoginError(true);
			});
	}

	return (
		<div className="flex justify-center align-middle">
			<form className="bg-opacity-20 bg-blue-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 align-middle justify-center flex flex-col mt-8"
		        onSubmit={loginHandler}>

				<h1 className="text-2xl text-center m-4">ejumina</h1>

				<img className="flex align-center h-10 w-8 justify-center mx-auto my-3" src={appicon} />

				{showInvalidLoginError && <p className="text-red-500 text-xl text-bold text-center">ACCESO DENEGADO</p> }

				<div className="mb-4">
					<input className={/*"shadow appearance-none border rounded"+
		                       "w-full py-2 px-3 text-gray-700 leading-tight"+
						               "sm:focus:outline-none focus:shadow-outline"*/
					                  styles.input}
		             id="CI" type="text" placeholder="CI"
								 onChange={(e) => setCI(e.target.value)} />
				</div>

				<div className="mb-4">
					<input className={/*"shadow appearance-none border border-red-500"+
						                "rounded w-full py-2 px-3 text-gray-700 mb-3"+
														"leading-tight focus:outline-none focus:shadow-outline"*/
														styles.input}
		             id="password" type="password"
								 placeholder="password"
		             onChange={(e) => setPassword(e.target.value)} /> 
				</div>
				<div className="flex items-center justify-center">
					<button
		      	className={/*"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2"+
							         "px-4 rounded focus:outline-none focus:shadow-outline"*/
											 styles.button("blue")}>
						Entrar
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;

//
