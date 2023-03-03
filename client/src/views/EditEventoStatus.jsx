import { useState } from 'react';
import Nav from '@layouts/Nav';
import SelectEvento from '@forms/SelectEvento';
import SetEventoStatus from '@forms/SetEventoStatus';

const EditEventoStatus = () => {
	const [evento, setEvento] = useState({});

	return (
		<>
			<Nav />
			<SelectEvento setEvento={setEvento}/>
			{ evento._id &&
				<SetEventoStatus evento={evento}/> 
			}
		</>
	);
}

export default EditEventoStatus;
