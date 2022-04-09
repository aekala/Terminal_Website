import Input from "./Input";
import History from "./History";
import Prompt from "./Prompt";
import { ChangeEvent, useEffect, useState } from "react";
import "../styles/index.css";

const Terminal = () => {
	const [command, setCommand] = useState("");
	const [history, setHistory] = useState(["History1", "History2"]);
	const [theme, setTheme] = useState("ocean");

	const updateCommand = (event: ChangeEvent<HTMLInputElement>) => {
		setCommand(event.target.value);
	};

	const runCommand = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setHistory([...history, command]);
			setCommand("");

			if (command === "clear") {
				clear();
			} else if (command === "about") {
				about();
			} else if (command.startsWith("theme")) {
				changeTheme(command.substring(5).trim());
			}
		}
	};

	const clear = () => {
		setHistory([]);
		setCommand("");
	};

	const about = () => {
		const info = `
			<div style="float: left; margin-top: 0.5em; margin-bottom: 0.5em;">
        <img style="float: left; display: block;" src="https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg" />
				<div style="margin-left: 15em; margin-right: 5em;">

          <p>Hi! I'm Leo and welcome to my website.</p>
          <br>
          <p>
            I'm a software engineer currently working for Liberty Mutual
            Insurance, and in my free time I like to build projects like this
            website.
          </p>
        </div>
			</div>`;

		setHistory([...history, info]);
		setCommand("");
	};

	const changeTheme = (colorTheme: string) => {
		setTheme(colorTheme);
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
