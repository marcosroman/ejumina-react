import { useState } from 'react';
import Nav from '@layouts/Nav';
import SelectUpcomingEvento from '@forms/SelectUpcomingEvento';
import SetFreePassesForm from '@forms/SetFreePassesForm';

const AssignFreePasses = () => {
  const [evento, setEvento] = useState({});

  return (
    <>
      <Nav />
      <SelectUpcomingEvento setEvento={setEvento}
		     										showOnlyWithoutAssignedFreePasses={true}/>
      { evento._id &&
        <SetFreePassesForm evento={evento}/> 
      }
    </>
  );
}

export default AssignFreePasses;
