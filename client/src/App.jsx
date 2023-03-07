import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Bouncer from '@views/Bouncer';
import RRPP from '@views/RRPP';
import Admin from '@views/Admin';
import Main from '@views/Main';
import Login from '@forms/Login';
import InviteToUpcomingEvento from '@views/InviteToUpcomingEvento';
//import Logout from '@views/Logout';
//import RequireAuth from '@auth/RequireAuth';
import NewEvento from '@views/NewEvento';
import VerEvento from '@views/VerEvento';
import NewUser from '@views/NewUser';
import EditEventoStatus from '@views/EditEventoStatus';
import AssignFreePasses from '@views/AssignFreePasses';
//import Loading from '@views/Loading';
import NewRegisterWithToken from '@forms/NewRegisterWithToken';
import InvalidToken from '@views/InvalidToken';
import NotFound from '@views/NotFound';
import { AuthProvider } from '@auth/useAuth';
import { useState } from 'react';

		//<div className="bg-blue-200 bg-cover h-screen h-full overflow-y-auto">
		//<div className="bg-fatty bg-cover h-screen overflow-y-auto bg-opacity-5">
		//<div className="bg-[url('./static/img/sweatyatrave.png')] bg-cover h-screen overflow-y-auto bg-opacity-5">
const App = () => {
	const [imgFileName,setImgFileName] = useState('./static/img/sweatyatrave-blurredtransparent.png');

	return (
		<div className="bg-[url('./static/img/sweatyatrave-blurredtransparent.png')] bg-cover h-screen overflow-y-auto bg-opacity-5">
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Main/>}/>
						<Route path="/bouncer" element={<Bouncer/>}/>
						<Route path="/rrpp" element={<RRPP/>}/>
						<Route path="/rrpp/:upcomingEventoId"
									 element={<InviteToUpcomingEvento/>}/>
						<Route path="/admin" element={<Admin/>}/>
						<Route path="/admin/evento/new" element={<NewEvento/>}/>
						<Route path="/admin/evento/view" element={<VerEvento/>}/>
						<Route path="/admin/evento/freepasses" element={<AssignFreePasses/>}/>
						<Route path="/admin/user/new" element={<NewUser/>}/>
						<Route path="/admin/evento/edit/estado" element={<EditEventoStatus/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register/:token" element={<NewRegisterWithToken/>}/>
						<Route path="/invalidtoken" element={<InvalidToken/>}/>
						<Route path="/*" element={<NotFound/>}/>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;

						// <Route path="/loading" element={<Loading/>}/>
/*
								 element={<RequireAuth>
									          <Bouncer/>
									 				</RequireAuth>}/>
													*/
					//<Route path="/logout" element={<Logout/>}/>
//=> para eso no hace falta una pagina.... un boton que haga logout nomas, borre kuki y me lleve a login
