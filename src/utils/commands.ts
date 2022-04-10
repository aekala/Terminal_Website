export const commandList = () => {
	return [
		"theme",
		"themes",
		"about",
		"leofetch",
		"linkedin",
		"github",
		"clear",
	];
};

export const isValidCommand = (command: string) => {
	if (command.indexOf(" ") !== -1) {
		command = command.substring(0, command.indexOf(" "));
	}
	return commandList().includes(command);
};

export const colorThemeList = ["dracula", "ocean", "raspberry"];
