import { Link } from 'react-router-dom';
import Nav from '@layouts/Nav';

			//<h1 className="text-blue-500 underline">Admin!</h1>
const Admin = () => {
	return (
		<>
		<Nav/>
		<div className="flex items-center justify-center flex-col text-center">
			<ul className="m-5">
				<li className="m-4">
					<h2 className="text-bold text-xl">Eventos</h2>
					<ul className="m-2">
						<li className="text-blue-500"><Link to="/admin/evento/new">Crear</Link></li>
						<li className="text-blue-500"><Link to="/admin/evento/freepasses">Asignar Free Passes</Link></li>
						<li className="text-blue-500"><Link to="/admin/evento/edit/estado">Modificar Estado</Link></li>
					</ul>
				</li>
				<li className="m-4">
					<h2 className="text-bold text-xl">Usuarios</h2>
					<ul className="m-2">
						<li className="text-blue-500"><Link to="/admin/user/new">Crear</Link></li>
					</ul>
				</li>
			</ul>
		</div>
		</>
	);
}

export default Admin;

						//<li className="text-blue-500"><Link to="/admin/evento/view">Ver</Link></li>
//
//
//
						//<li>Borrar</li>
						//<li>Deshabilitar</li>
						//<li>Rehabilitar</li>
//
/*				<li className="m-4">
					<h2 className="text-bold text-xl">Invitados</h2>
					<ul className="m-2">
						<li>Ver</li>
						<li>Crear</li>
						<li>Banear</li>
						<li>Desbanear</li>
						<li>Borrar</li>
					</ul>
				</li>       */
