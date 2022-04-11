import { tokenize, endOfTokensList } from "./tokens";
import HistoryItem from "../historyItem";
import { commandList, colorThemeList } from "./commands";
import { doggo, ghost } from "./art";

const generateUnrecognizedCommandMessage = (command: string): string => {
	const msg = `<p style="color: var(--color-text-error);">command not found: '${command}'. Try 'help' to view a list of valid commands.</p>`;
	return msg;
};

const execute = (
	history: Array<HistoryItem>,
	updateTerminal: (value: Array<HistoryItem>, resetCommand?: boolean) => void,
	clearHistory: () => void,
	clearCommand: () => void,
	command: string,
	theme: string,
	setTheme: (value: string) => void
) => {
	let tokens = tokenize(command);
	const start = tokens[0];
	switch (start) {
		case "":
		case " ":
			if (endOfTokensList(tokens)) {
				// just print input if empty or made up solely of spaces
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			clearCommand();
			break;
		case "clear":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				clearHistory();
				clearCommand();
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "leofetch":
		case "about":
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
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(info, true, false),
				]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "theme":
			tokens.shift();
			let newHistoryItems = [new HistoryItem(command)];
			if (endOfTokensList(tokens)) {
				newHistoryItems.push(new HistoryItem(theme, false, false)); // print out current theme
			} else {
				const nextToken = tokens.shift();
				if (nextToken === " " && colorThemeList.includes(tokens[0])) {
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
			updateTerminal([...history, ...newHistoryItems, HistoryItem.newline()]);
			break;

		case "themes":
			let themesOutput = `<p style="color: var(--color-text-valid);">Themes: </p>`;
			colorThemeList.forEach((theme: string) => {
				themesOutput += `<p>${theme}</p>`;
			});
			themesOutput += `<br><p style="color: var(--color-border);">Type "theme [&lt;name&gt;]" to change theme. (e.g. "theme raspberry")</p>`;
			updateTerminal([
				...history,
				new HistoryItem(command),
				new HistoryItem(themesOutput, true, false),
				HistoryItem.newline(),
			]);
			break;

		case "linkedin":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://www.linkedin.com/in/leo-kodish-b83aa712b/");
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "github":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://github.com/aekala");
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "repo":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://github.com/aekala/Terminal_Website");
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "echo":
			updateTerminal([
				...history,
				new HistoryItem(command),
				new HistoryItem(command.substring(5), false, false), // str.substring will return "" if longer than string length
				HistoryItem.newline(),
			]);
			break;

		case "date":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(new Date().toString()),
				]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "boo":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(ghost, true, false),
				]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "doggo":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(doggo, true, false),
				]);
			} else {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(
						generateUnrecognizedCommandMessage(command),
						true,
						false
					),
				]);
			}
			break;

		case "help":
			let helpOutput = `<p style="color: var(--color-text-valid);">Available commands:</p>`;
			commandList.forEach((c) => {
				helpOutput += `<p>${c}</p>`;
			});

			helpOutput += "<br>[ctrl+c] to cancel command<br><br>";
			updateTerminal([
				...history,
				new HistoryItem(command),
				new HistoryItem(helpOutput, true, false),
			]);
			break;

		default:
			updateTerminal([
				...history,
				new HistoryItem(command),
				new HistoryItem(
					generateUnrecognizedCommandMessage(command),
					true,
					false
				),
			]);
	}
};

export default execute;
