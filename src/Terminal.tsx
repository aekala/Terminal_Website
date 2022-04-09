import Input from "./Input";
import History from "./History";
import Prompt from "./Prompt";
import { ChangeEvent, useRef, useState } from "react";

const Terminal = () => {
	const [command, setCommand] = useState("");
	const [history, setHistory] = useState(["History1", "History2"]);
	const containerRef = useRef(null);

	const updateCommand = (event: ChangeEvent<HTMLInputElement>) => {
		setCommand(event.target.value);
	};

	const runCommand = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setHistory([...history, command]);
			setCommand("");
		}
	};

	document.body.className = "bg-theme-fill theme-raspberry";
	return (
		<div ref={containerRef}>
			<History history={history} />
			<Prompt />
			<Input command={command} onChange={updateCommand} onSubmit={runCommand} />
		</div>
	);
};

export default Terminal;
