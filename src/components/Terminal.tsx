import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import "../styles/index.css";
import History from "./History";
import HistoryItem from "../historyItem";
import Prompt from "./Prompt";
import Input from "./Input";
import execute from "../utils/execute";
import { isValidCommand, autoCompleteCommand } from "../utils/commands";
import { startup } from "../utils/startup";
import { colorThemeClassMap, defaultColorThemeClass } from "../utils/colors";

const Terminal = React.forwardRef((props: any, ref: any) => {
	const [command, setCommand] = useState("");
	const [history, setHistory] = useState(startup);
	const [theme, setTheme] = useState("dracula");

	const updateCommand = (event: ChangeEvent<HTMLInputElement>) => {
		setCommand(event.target.value);
	};

	const updateTerminal = (
		history: Array<HistoryItem>,
		resetCommand: boolean = true
	) => {
		setHistory(history);
		if (resetCommand) clearCommand();
	};

	const generateUnrecognizedCommandMessage = (command: string): string => {
		const msg = `<p style="color: var(--color-text-error);">command not found: '${command}'. Try 'help' to view a list of valid commands.</p>`;
		return msg;
	};

	const updateTerminalWithErrorMessage = () => {
		updateTerminal([
			...history,
			new HistoryItem(command),
			new HistoryItem(generateUnrecognizedCommandMessage(command), true, false),
		]);
	};

	const runCommand = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			event.preventDefault();
			execute(
				history,
				updateTerminal,
				updateTerminalWithErrorMessage,
				clearHistory,
				clearCommand,
				command,
				theme,
				setTheme
			);
		} else if (event.ctrlKey && event.key === "c") {
			event.preventDefault();
			setHistory([...history, new HistoryItem(command)]);
			clearCommand();
		} else if (event.ctrlKey && event.key === "l") {
			event.preventDefault();
			clearHistory();
			clearCommand();
		} else if (event.key === "Tab") {
			event.preventDefault();
			autoCompleteCommand(command, setCommand);
		}
	};

	const clearHistory = () => {
		setHistory([]);
	};

	const clearCommand = () => {
		setCommand("");
	};

	useEffect(() => {
		document.body.className =
			colorThemeClassMap.get(theme) || defaultColorThemeClass;
	}, [theme]);

	React.useEffect(() => {
		ref.current.focus();
		ref.current.scrollIntoView({ behavior: "smooth" });
	}, [history]);

	return (
		<div className='overflow-hidden h-full p-4'>
			<div className='overflow-y-auto h-full'>
				<History history={history} />
				<Prompt />
				<Input
					command={command}
					onChange={updateCommand}
					onSubmit={runCommand}
					isValidCommand={isValidCommand(command)}
					ref={ref}
				/>
			</div>
		</div>
	);
});

export default Terminal;
