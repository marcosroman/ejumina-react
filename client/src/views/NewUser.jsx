import Nav from '@layouts/Nav';
import NewUserForm from '@forms/NewUserForm';

// username, password, CI, role... that's all!
const NewUser = () => {
	return (
		<>
			<Nav/>
			<NewUserForm/>
		</>
	);

}

export default NewUser;
