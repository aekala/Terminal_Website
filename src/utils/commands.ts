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
	"repo",
	"theme",
	"themes",
];

export const isValidCommand = (command: string) => {
	if (command.indexOf(" ") !== -1) {
		command = command.substring(0, command.indexOf(" "));
	}
	return commandList.includes(command);
};

export const colorThemeList = ["dracula", "ocean", "raspberry"];
