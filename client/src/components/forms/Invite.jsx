const Invite = ({eventoId, setInvitadoCI, invitado, setInvitado}) => {
	const hardCodedRRPPId="63ffac2da6a590d4f150ed5c";

	return (
		<div className="flex justify-between w-8/12 m-10">
			<button className="border-solid border-2 border-red-100 bg-red-300 rounded px-2 py-1"
		   				onClick={e => {setInvitado({}); setInvitadoCI("");}}>
				Cancelar
			</button>
			<button className="border-solid border-2 bg-gradient-to-r from-violet-500 to-fuchsia-50 border-purple-100 rounded px-2 py-1">
				Free Pass</button>
			<button className="border-solid border-2 border-green-100 bg-green-300 rounded px-2 py-1">
				Invitar
			</button>
		</div>
	);
}

export default Invite;
