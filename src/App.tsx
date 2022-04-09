import "./App.css";
import Terminal from "./Terminal";

function App() {
	return (
		<>
			{/* <head>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
					key='viewport'
				/>
			</head> */}
			<div className='p-4 border-4 rounded border-theme-border'>
				<Terminal />
			</div>
		</>
	);
}

export default App;
