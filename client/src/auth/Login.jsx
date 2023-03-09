import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from "@auth/useAuth";
import styles from "@/styles";
import appicon from "@/static/appicon.png";

const Login = () => {
	const [CI, setCI] = useState('');
	const [password, setPassword] = useState('');
	const [showInvalidLoginError, setShowInvalidLoginError] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();
	const { state } = useLocation();


	/*
	const [imageStyle, setImageStyle] = useState("bg-[url('./static/gif/southpark.gif')] bg-cover h-screen overflow-y-auto bg-opacity-5");
	const [image, setImage] = useState("");

	const randomImage = () => {
		const items = ['costumed', 'crazyfrog', 'pretties', 'roboto', 'simpsons', 'southpark', 'theanvil', 'weirdo'];

		return items[Math.floor(Math.random()*(items.length))];
	}

	const randomImageStyle = () => {
		//return "bg-[url('./static/gif/" + randomImage() + ".gif')] bg-cover h-screen overflow-y-auto bg-opacity-5";
		return "url('./static/gif/" + randomImage() + ".gif')";
	}


	useEffect(() => {
		//setImageStyle(randomImageStyle());
		setImage(randomImageStyle());
		console.log(randomImageStyle());
		console.log(image);
		//console.log(randomImageStyle());
	}, []);
	
	*/
	const loginHandler = (event) => {
		event.preventDefault();

    axios.post('http://localhost:8000/api/user/login',
			{ CI, password },
			{ withCredentials: true })
      .then(res => {
				const rol = res.data.rol;
				const CI = res.data.CI;
				const userId = res.data._id;

				login(rol, CI, userId).then(() => {
					console.log(res.data);

					if (state) {
						navigate(state.path);
					} else {
						if (rol === "Admin") {
							navigate('/admin');
						}
						else if (rol === "Bouncer") {
							navigate('/bouncer');
						} else if (rol === "RRPP") {
							navigate('/rrpp');
						}
					}
				})
				//console.log(localStorage.getItem('userToken'));
			})
      .catch(err => {
				console.log(err);
				setShowInvalidLoginError(true);
			});
	}

	//<div className={"bg-[url('./static/gif/"+randomImage()+".gif')] bg-cover h-screen overflow-y-auto bg-opacity-5"}>
	//<div className={imageStyle}>
	//<div className="bg-[url('./static/gif/simpsons.gif')] bg-cover h-screen overflow-y-auto bg-opacity-5">
		///<div className={"bg- bg-cover h-screen overflow-y-auto bg-opacity-5"} style={{backgroundImage:randomImageStyle}}>
	
	return (
	<div className="bg-[url('./static/gif/gif.gif')] bg-cover h-screen overflow-y-auto bg-opacity-5">
			<div className="flex justify-center align-middle">
				<form className="bg-opacity-20 bg-blue-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 align-middle justify-center flex flex-col mt-8"
							onSubmit={loginHandler}>

					<h1 className="animate-bounce text-3xl text-center m-4">ejumina</h1>

					<img className="flex align-center h-8 w-8 justify-center mx-auto my-3" src={appicon} />

					{showInvalidLoginError && <p className="text-red-500 text-xl text-bold text-center">ACCESO DENEGADO</p> }

					<div className="mb-4">
						<input className={styles.input}
									 id="CI" type="text" placeholder="CI"
									 onChange={(e) => setCI(e.target.value)} />
					</div>

					<div className="mb-4">
						<input className={styles.input}
									 id="password" type="password"
									 placeholder="password"
									 onChange={(e) => setPassword(e.target.value)} /> 
					</div>
					<div className="flex items-center justify-center">
						<button
							className={styles.button("blue")}>
							Entrar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;

//
