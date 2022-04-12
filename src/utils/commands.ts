export const commandList = [
	"about",
	"boo",
	"clear",
	"date",
	"doggo",
	"echo",
	"github",
	"help",
	"leofetch",
	"linkedin",
	"projects",
	"repo",
	"theme",
	"themes",
	"work",
];

export const isValidCommand = (command: string) => {
	if (command.indexOf(" ") !== -1) {
		command = command.substring(0, command.indexOf(" "));
	}
	return commandList.includes(command);
};

export const colorThemeList = [
	"belafonte",
	"dracula",
	"gruvbox",
	"ocean",
	"raspberry",
];
