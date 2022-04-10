export const commandList = [
	"about",
	"theme",
	"themes",
	"leofetch",
	"linkedin",
	"github",
	"clear",
	"help",
];

export const isValidCommand = (command: string) => {
	if (command.indexOf(" ") !== -1) {
		command = command.substring(0, command.indexOf(" "));
	}
	return commandList.includes(command);
};

export const colorThemeList = ["dracula", "ocean", "raspberry"];
