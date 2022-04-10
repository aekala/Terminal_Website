export const tokenize = (str: string): Array<string> => {
	return str.split(/( )/);
};

export const endOfTokensList = (tokens: Array<string>): boolean => {
	return tokens.every((token) => token === "" || token === " ");
};
