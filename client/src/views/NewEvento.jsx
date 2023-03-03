import { useState } from 'react';
import NewEventoForm from '@forms/NewEventoForm';
import SetFreePassesForm from '@forms/SetFreePassesForm';
import Nav from '@layouts/Nav';

const NewEvento = () => {
	const [evento, setEvento] = useState({});

	return (
		<>
			<Nav/>
			{ !(evento._id) ?
				<NewEventoForm setEvento={setEvento} />
				: <SetFreePassesForm evento={evento} />
			}
		</>
	);
}

export default NewEvento;
