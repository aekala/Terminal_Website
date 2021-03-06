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
	"rabbit",
	"repo",
	"theme",
	"themes",
	"startup",
	"sudo",
	"resume",
	"work",
];

export const isValidCommand = (command: string) => {
	command = command.toLowerCase();
	if (command.indexOf(" ") !== -1) {
		command = command.substring(0, command.indexOf(" "));
	}
	return commandList.includes(command);
};

export const autoCompleteCommand = (
	command: string,
	setCommand: (command: string) => void
): string | null => {
	command = command.toLowerCase();
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
