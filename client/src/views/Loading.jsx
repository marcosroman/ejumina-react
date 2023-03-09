const Loading = () => {

	// un spinner pegaria aca... del logo que tengo
	return (
		<div className="bg-[url('./static/img/sweatyatrave.png')] bg-cover h-screen overflow-y-auto bg-opacity-5">
			<p className="text-center text-white text-3xl mt-14">eha&#39;aromina...!</p>
			<p className="text-center text-white text-xs mt-5">no deberia tardar mas de unos segundos...</p>
			<p className="text-center text-white text-xs mt-1">si tarda mas, avisale al admin</p>
		</div>
	);
}

export default Loading;
