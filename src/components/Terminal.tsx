import Input from "./Input";
import History from "./History";
import Prompt from "./Prompt";
import { ChangeEvent, useEffect, useState } from "react";
import "../styles/index.css";
import execute from "../utils/execute";
import HistoryItem from "../historyItem";
import { isValidCommand } from "../utils/commands";

const Terminal = () => {
	const [command, setCommand] = useState("");
	const [history, setHistory] = useState([
		new HistoryItem("History1"),
		new HistoryItem("History2"),
	]);
	const [theme, setTheme] = useState("dracula");

	const updateCommand = (event: ChangeEvent<HTMLInputElement>) => {
		setCommand(event.target.value);
	};

	const runCommand = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			event.preventDefault();
			execute(
				history,
				setHistory,
				clearHistory,
				clearCommand,
				command,
				setCommand,
				theme,
				setTheme
			);
		}
	};

	const clearHistory = () => {
		setHistory([]);
	};

	const clearCommand = () => {
		setCommand("");
	};

	useEffect(() => {
		switch (theme) {
			case "ocean":
				document.body.className = "bg-theme-fill theme-ocean";
				break;
			case "raspberry":
				document.body.className = "bg-theme-fill theme-raspberry";
				break;
			case "dracula":
				document.body.className = "bg-theme-fill theme-dracula";
				break;
		}
	}, [theme]);

	return (
		<div>
			<History history={history} />
			<Prompt />
			<Input command={command} onChange={updateCommand} onSubmit={runCommand} />
		</div>
	);
};

export default Terminal;
