import { tokenize, endOfTokensList } from "./tokens";
import HistoryEntry from "../historyEntry";

const execute = (
	history: Array<HistoryEntry>,
	setHistory: (value: Array<HistoryEntry>) => void,
	clearHistory: () => void,
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
		}
	} else if (tokens[0] === "about") {
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
			setHistory([...history, new HistoryEntry(info, true)]);
		} else {
			setHistory([...history, new HistoryEntry(command)]);
		}
		setCommand("");
	} else if (tokens[0] === "theme") {
		tokens.shift();
		setTheme(command.substring(6));
		setHistory([...history, new HistoryEntry(command)]);
		setCommand("");
	} else {
		setHistory([...history, new HistoryEntry(command)]);
		setCommand("");
	}
};

export default execute;