import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Bouncer from '@views/Bouncer';
import RRPP from '@views/RRPP';
import Admin from '@views/Admin';
import Main from '@views/Main';
import Login from '@auth/Login';
import InviteToUpcomingEvento from '@views/InviteToUpcomingEvento';
import NewEvento from '@views/NewEvento';
import VerEvento from '@views/VerEvento';
import NewUser from '@views/NewUser';
import EditEventoStatus from '@views/EditEventoStatus';
import AssignFreePasses from '@views/AssignFreePasses';
import NewRegisterWithToken from '@forms/NewRegisterWithToken';
import InvalidToken from '@views/InvalidToken';
import NotFound from '@views/NotFound';
import Unauthorized from '@views/Unauthorized';
import { AuthProvider } from '@auth/useAuth';
import RequireAuth from '@auth/RequireAuth';

//import Logout from '@views/Logout';
//import RequireAuth from '@auth/RequireAuth';
//import Loading from '@views/Loading';
		//<div className="bg-blue-200 bg-cover h-screen h-full overflow-y-auto">
		//<div className="bg-fatty bg-cover h-screen overflow-y-auto bg-opacity-5">
		//<div className="bg-[url('./static/img/sweatyatrave.png')] bg-cover h-screen overflow-y-auto bg-opacity-5">
//
//
//
/*
						<Route path="/" element={<RequireAuth>
																		   <Main/>
																		 </RequireAuth>}/>
*/

		//<div className="bg-[url('./static/img/sweatyatrave-blurredtransparent.png')] bg-cover h-screen overflow-y-auto bg-opacity-5">
//
		//<div className="bg-[url('./static/img/crazyfrog.gif')] bg-cover h-screen overflow-y-auto bg-opacity-5">
const App = () => {
	const [imgFileName,setImgFileName] = useState('./static/img/sweatyatrave-blurredtransparent.png');

	return (
		<div className="bg-[url('./static/img/sweatyatrave-blurredtransparent.png')] bg-cover h-screen overflow-y-auto bg-opacity-5">
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register/:token" element={<NewRegisterWithToken/>}/>

						<Route path="/" element={<RequireAuth authedRoles={["Admin","RRPP","Bouncer"]}><Main/></RequireAuth>}/>

						<Route path="/bouncer"
									 element={<RequireAuth authedRoles={"Bouncer"}>
										   				<Bouncer/>
										 				</RequireAuth>}/>

						<Route path="/rrpp" element={<RequireAuth authedRoles={"RRPP"}>
																				   <RRPP/>
																				 </RequireAuth>}/>
						<Route path="/rrpp/:upcomingEventoId"
									 element={<RequireAuth authedRoles={"RRPP"}>
										 	 				<InviteToUpcomingEvento/>
                     				</RequireAuth>}/>

						<Route path="/admin" element={<RequireAuth authedRoles={"Admin"}>
																						<Admin/>
																					</RequireAuth>}/>

						<Route path="/admin/evento/new" element={<RequireAuth authedRoles={"Admin"}>
																										 	 <NewEvento/>
																										 </RequireAuth>}/>

						<Route path="/admin/evento/view" element={<RequireAuth authedRoles={"Admin"}><VerEvento/></RequireAuth>}/>
						<Route path="/admin/evento/freepasses" element={<RequireAuth authedRoles={"Admin"}><AssignFreePasses/></RequireAuth>}/>
						<Route path="/admin/user/new" element={<RequireAuth authedRoles={"Admin"}><NewUser/></RequireAuth>}/>
						<Route path="/admin/evento/edit/estado" element={<RequireAuth authedRoles={"Admin"}><EditEventoStatus/></RequireAuth>}/>

						<Route path="/unauthorized" element={<Unauthorized/>}/>
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
