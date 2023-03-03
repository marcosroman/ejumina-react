import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@auth/useAuth';

const Logout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:8000/api/user/logout')
			.then(res => {
				console.log(res);
				localStorage.removeItem("userToken");
				navigate('/');
			})
			.catch(err=>console.log(err));
	},[]);
}

export default Logout;
