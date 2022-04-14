import React from "react";
import "../styles/App.css";
import Terminal from "./Terminal";

function App() {
	const inputRef = React.createRef<HTMLInputElement>();

	const onClickAnywhere = () => {
		inputRef.current?.focus();
	};

	return (
		<div
			className='p-4 border-4 rounded border-theme-border'
			onClick={onClickAnywhere}
		>
			<Terminal ref={inputRef} />
		</div>
	);
}

export default App;
