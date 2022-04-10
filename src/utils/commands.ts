export const commandList = () => {
	return ["theme", "about", "leofetch", "linkedin", "github"];
};

export const isValidCommand = (command: string) => {
	return commandList().includes(command);
};

export const colorThemeList = () => {
	return ["dracula", "ocean", "raspberry"];
};
