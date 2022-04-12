import { tokenize, endOfTokensList } from "./tokens";
import HistoryItem from "../historyItem";
import { commandList, colorThemeList } from "./commands";
import { doggo, ghost } from "./art";
import workExperience from "./experience";
import projects from "./projects";
import { leofetch, emifetch } from "./leofetch";

const execute = (
	history: Array<HistoryItem>,
	updateTerminal: (value: Array<HistoryItem>, resetCommand?: boolean) => void,
	updateTerminalWithErrorMessage: any,
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
				updateTerminalWithErrorMessage();
			}
			clearCommand();
			break;

		case "about":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				const info = `
          <div class="mt-5">
            <p>Hi! I'm Leo and welcome to my website.</p>
            <br>
            <p>
              I'm a software engineer currently working for Liberty Mutual
              Insurance, and in my free time I like to build projects like this
              website.
            </p>
            <br>
          </div>`;
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(info, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
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
				updateTerminalWithErrorMessage();
			}
			break;

		case "clear":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				clearHistory();
				clearCommand();
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "date":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(new Date().toString() + "<br><br>", true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
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
				updateTerminalWithErrorMessage();
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

		case "emifetch": // easter egg for emily
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(emifetch, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "github":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://github.com/aekala");
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "help":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				let helpOutput = `<p style="color: var(--color-text-valid);">Available commands:</p>`;
				commandList.forEach((cmnd) => {
					helpOutput += `<p>${cmnd}</p>`;
				});

				helpOutput += "<br>[ctrl+c] to cancel command<br><br>";
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(helpOutput, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "leofetch":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(leofetch, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "linkedin":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://www.linkedin.com/in/leo-kodish-b83aa712b/");
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "projects":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				let projectsOutput = `<pre>${projects}</pre>`;

				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(projectsOutput, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "repo":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://github.com/aekala/Terminal_Website");
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "theme":
			tokens.shift();
			let newHistoryItems = [new HistoryItem(command)];
			if (endOfTokensList(tokens)) {
				newHistoryItems.push(new HistoryItem(theme, false, false)); // print out current theme
			} else {
				const colorTheme = tokens.shift();
				if (colorTheme && colorThemeList.includes(colorTheme)) {
					if (endOfTokensList(tokens)) {
						if (colorTheme === theme) {
							newHistoryItems.push(
								new HistoryItem(`Theme is already ${colorTheme}!`, false, false)
							);
						} else {
							setTheme(colorTheme); // change theme if in format "theme [<themeName>]"
							newHistoryItems.push(
								new HistoryItem(`Theme changed to ${colorTheme}`, false, false)
							);
						}
					} else {
						const unrecognizedTheme = colorTheme + " " + tokens.join(" ");
						newHistoryItems.push(
							new HistoryItem(
								`<p style="color: var(--color-text-error);">theme '${unrecognizedTheme}' not found: type "theme [&lt;name&gt;]" to change theme. (e.g. "theme raspberry")</p>`,
								true,
								false
							)
						);
					}
				} else {
					newHistoryItems.push(
						new HistoryItem(
							`<p style="color: var(--color-text-error);">theme '${colorTheme}' not found: type "theme [&lt;name&gt;]" to change theme. (e.g. "theme raspberry")</p>`,
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

		case "work":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				let workExperienceOutput = `<pre>${workExperience}</pre>`;

				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(workExperienceOutput, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		default:
			updateTerminalWithErrorMessage();
	}
};

export default execute;
