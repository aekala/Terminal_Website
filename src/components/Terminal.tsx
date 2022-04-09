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
			console.log(history);
			setHistory([...history, command]);
			setCommand("");

			if (command === "clear") {
				clear();
			} else if (command === "about") {
				about();
			}
		}
	};

	const clear = () => {
		setHistory([]);
		setCommand("");
	};

	const about = () => {
		const info1 = (
			<div>
				<p>Hi! I'm Leo and welcome to my website</p>
				<p>
					I'm a software engineer currently working for Liberty Mutual
					Insurance, and in my free time I like to build projects like this
					website.
				</p>
			</div>
		);

		const info = `Hi! I'm Leo and welcome to my website.\nI'm a software engineer currently working for Liberty Mutual
					Insurance, and in my free time I like to build projects like this
					website.`;
		setHistory([...history, info.toString()]);
		setCommand("");
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
