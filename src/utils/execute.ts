import { tokenize, endOfTokensList } from "./tokens";
import HistoryItem from "../historyItem";
import { commandList, colorThemeList } from "./commands";
import { doggo, ghost } from "./art";

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

		case "clear":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				clearHistory();
				clearCommand();
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "leofetch":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				const info = `
         <br>
         <div class="flex flex-row my-2">
          <img style="background-color: #8be9fd;" class="h-80 w-85 ml-3 rounded-sm" src="images/red.jpg" />
          <div class="ml-14 mr-8">
            <p>leo@kodish</p>
            <p>----------</p>  
            <p style="color: var(--color-text-base);">Name: <span style="color: var(--color-white);">Leo Kodish</span></p>
            <p style="color: var(--color-text-base);">Hometown: <span style="color: var(--color-white);">Honolulu, Hawaii</span></p>
            <p style="color: var(--color-text-base);">College: <span style="color: var(--color-white);">Ohio State University</span></p>
            <p style="color: var(--color-text-base);">Hobbies: <span style="color: var(--color-white);">Coding, Music, Movies, Mechanical Keyboards</span></p>
            <p style="color: var(--color-text-base);">Favorite Food: <span style="color: var(--color-white);">Katsu Curry Rice</span></p>
            <p style="color: var(--color-text-base);">Favorite Game: <span style="color: var(--color-white);">Persona 4</span></p>
            <p style="color: var(--color-text-base);">Favorite Movie: <span style="color: var(--color-white);">The Godfather Part II</span></p>
            <br>
            <div class="flex flex-row">
              <div style="background-color: var(--color-black);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-red);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-green);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-yellow);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-blue);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-purple);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-cyan);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-white);" class="h-14 w-14"></div>
            </div>          
            <div class="flex flex-row">
              <div style="background-color: var(--color-brightBlack);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-brightRed);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-brightGreen);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-brightYellow);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-brightBlue);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-brightPurple);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-brightCyan);" class="h-14 w-14"></div>
              <div style="background-color: var(--color-brightWhite);" class="h-14 w-14"></div>
            </div>
          </div>
        </div><br>`;
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(info, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
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

		case "linkedin":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://www.linkedin.com/in/leo-kodish-b83aa712b/");
				updateTerminal([...history, new HistoryItem(command)]);
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

		case "repo":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				window.open("https://github.com/aekala/Terminal_Website");
				updateTerminal([...history, new HistoryItem(command)]);
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

		case "date":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(new Date().toString()),
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

		case "experience":
			tokens.shift();
			if (endOfTokensList(tokens)) {
				// TODO: fix unordered list to show bullets (may end up changing design later)
				const workExperience = `  
        <div>
          <p>Liberty Mutual, Seattle, WA - Software Engineer (Sept. 2020 - Present)<p>
          <ul>
            <li>Worked on a team composed of new hires and delivered a feature for insurance agents to easily add a vehicle through a customer&apos;s policy dashboard</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
        <br>
        `;
				updateTerminal([
					...history,
					new HistoryItem(command),
					new HistoryItem(workExperience, true, false),
				]);
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		case "help":
			tokens.shift();
			if (endOfTokensList(tokens)) {
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
			} else {
				updateTerminalWithErrorMessage();
			}
			break;

		default:
			updateTerminalWithErrorMessage();
	}
};

export default execute;
