import { tokenize, endOfTokensList } from "./tokens";
import HistoryItem from "../historyItem";
import { colorThemeList } from "./colors";
import { banner, rabbit, doggo, ghost } from "./art";
import workExperience from "./experience";
import projects from "./projects";
import { leofetch, emifetch } from "./leofetch";
import { help } from "./help";
import { startup } from "./startup";

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
	let tokens = tokenize(command.toLowerCase());
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

		// case "about":
		// 	tokens.shift();
		// 	if (endOfTokensList(tokens)) {
		// 		const info = `
		//       <div class="mt-5">
		//         <p>Hi! I'm Leo and welcome to my website.</p>
		//         <br>
		//         <p>
		//           I'm a software engineer based in Seattle, WA and currently working for Liberty Mutual
		//           Insurance.
		//         </p>
		//         <br>
		//       </div>`;
		// 		updateTerminal([
		// 			...history,
		// 			new HistoryItem(command),
		// 			new HistoryItem(info, true, false),
		// 		]);
		// 	} else {
		// 		updateTerminalWithErrorMessage();
		// 	}
		// 	break;

		case "banner":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(banner, true, false),
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

		case "rabbit":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(rabbit, true, false),
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
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(help(), true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "about":
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
				const randomTheme =
					colorThemeList[Math.floor(Math.random() * colorThemeList.length)];
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
								`<p style="color: var(--color-text-error);">theme '${unrecognizedTheme}' not found: type "theme [&lt;name&gt;]" to change theme. (e.g. "theme ")</p>`,
								true,
								false
							)
						);
					}
				} else {
					newHistoryItems.push(
						new HistoryItem(
							`<p style="color: var(--color-text-error);">theme '${colorTheme}' not found: type "theme [&lt;name&gt;]" to change theme. (e.g. "theme ${randomTheme}")</p>`,
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
			const randomTheme =
				colorThemeList[Math.floor(Math.random() * colorThemeList.length)];
			colorThemeList.forEach((theme: string) => {
				themesOutput += `<p>${theme}</p>`;
			});
			themesOutput += `<br><p style="color: var(--color-border);">Type "theme [&lt;name&gt;]" to change theme. (e.g. "theme ${randomTheme}")</p>`;
			updateTerminal([
				...history,
				new HistoryItem(command),
				new HistoryItem(themesOutput, true, false),
				HistoryItem.newline(),
			]);
			break;

		case "startup":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal(startup);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "sudo":
			tokens.shift();
			updateTerminal([
				...history,
				new HistoryItem(command),
				new HistoryItem(
					"Hmmm, You're not Leo, so I don't think so.<br><br>",
					true,
					false
				),
			]);
			break;

		case "resume":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open(
					"https://docs.google.com/document/d/1iq1-6M-1oShsk6lnWcFmF4YGnUVECu3bPrWhIQhMyOM/edit?usp=sharing"
				);
				updateTerminal([...history, new HistoryItem(command)]);
			} else {
				updateTerminalWithErrorMessage();
			}
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
