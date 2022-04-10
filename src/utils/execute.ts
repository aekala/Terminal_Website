import { tokenize, endOfTokensList } from "./tokens";
import HistoryItem from "../historyItem";
import { colorThemeList } from "./commands";

const generateUnrecognizedCommandMessage = (command: string): string => {
	const msg = `<p style="color: var(--color-text-error);">command not found: '${command}'. Try 'help' to view a list of valid commands.</p>`;
	return msg;
};

const execute = (
	history: Array<HistoryItem>,
	setHistory: (value: Array<HistoryItem>) => void,
	clearHistory: () => void,
	clearCommand: () => void,
	command: string,
	setCommand: (value: string) => void,
	theme: string,
	setTheme: (value: string) => void
) => {
	let tokens = tokenize(command);
	if (tokens[0] === "clear") {
		tokens.shift();
		if (endOfTokensList(tokens)) {
			clearHistory();
			clearCommand();
		}
	} else if (tokens[0] === "leofetch" || tokens[0] === "about") {
		tokens.shift();
		if (endOfTokensList(tokens)) {
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
			setHistory([
				...history,
				new HistoryItem(command),
				new HistoryItem(info, true, false),
			]);
		} else {
			setHistory([...history, new HistoryItem(command)]);
		}
		clearCommand();
	} else if (tokens[0] === "theme") {
		tokens.shift();
		let newHistoryItems = [new HistoryItem(command)];
		if (endOfTokensList(tokens)) {
			newHistoryItems.push(new HistoryItem(theme, false, false)); // print out current theme
		} else {
			const nextToken = tokens.shift();
			if (nextToken === " " && colorThemeList().includes(tokens[0])) {
				const colorTheme = tokens[0];
				tokens.shift();
				if (endOfTokensList(tokens)) {
					setTheme(colorTheme); // change theme if in format "theme [themeName]"
				} else {
					newHistoryItems.push(
						new HistoryItem(
							generateUnrecognizedCommandMessage(command),
							true,
							false
						)
					);
				}
			} else {
				newHistoryItems.push(
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					)
				);
			}
		}
		setHistory([...history, ...newHistoryItems]);
		clearCommand();
	} else if (tokens[0] === "linkedin") {
		window.open("https://www.linkedin.com/in/leo-kodish-b83aa712b/");
		setHistory([...history, new HistoryItem(command)]);
		clearCommand();
	} else if (tokens[0] === "github") {
		window.open("https://github.com/aekala");
		setHistory([...history, new HistoryItem(command)]);
		clearCommand();
	} else {
		setHistory([
			...history,
			new HistoryItem(command),
			new HistoryItem(generateUnrecognizedCommandMessage(command), true, false),
		]);
		clearCommand();
	}
};

export default execute;
