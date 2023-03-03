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
import NewUser from '@views/NewUser';
import EditEventoStatus from '@views/EditEventoStatus';
import { AuthProvider } from '@auth/useAuth';

const App = () => {
	return (
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
					<Route path="/admin/user/new" element={<NewUser/>}/>
					<Route path="/admin/evento/editstatus" element={<EditEventoStatus/>}/>
					<Route path="/login" element={<Login/>}/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

/*
								 element={<RequireAuth>
									          <Bouncer/>
									 				</RequireAuth>}/>
													*/
					//<Route path="/logout" element={<Logout/>}/>
//=> para eso no hace falta una pagina.... un boton que haga logout nomas, borre kuki y me lleve a login
