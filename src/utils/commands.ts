export const commandList = [
	"about",
	"banner",
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
	"startup",
	"resume",
	"work",
];

export const isValidCommand = (command: string) => {
	if (command.indexOf(" ") !== -1) {
		command = command.substring(0, command.indexOf(" "));
	}
	return commandList.includes(command);
};

export const autoCompleteCommand = (
	command: string,
	setCommand: (command: string) => void
): string | null => {
	if (command.trim() !== "") {
		for (let cmd of commandList) {
			if (cmd.startsWith(command)) {
				setCommand(cmd);
				return cmd;
			}
		}
	}
	return null;
};
