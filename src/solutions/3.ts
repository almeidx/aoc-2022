const LOWERCASE_A_CHAR_CODE = "a".codePointAt(0)!;
const ALPHABET_RANGE = 26;

export function solveDay3Part1(input: string) {
	const parsed = input.split("\n").map(splitStringInHalf);
	const commonItems = parsed.map((strings) => findCommonCharsInString(...strings));

	return commonItems.reduce((acc, item) => calculatePriority(item) + acc, 0);
}

export function solveDay3Part2(input: string) {
	const grouped = groupArray(input.split("\n"));

	return grouped.reduce((sum, strings) => sum + calculatePriority(findCommonCharsInString(...strings)), 0);
}

function splitStringInHalf(str: string) {
	return [str.slice(0, str.length / 2), str.slice(str.length / 2)] as const;
}

function findCommonCharsInString(str1: string, ...others: string[]) {
	return str1
		.split("")
		.filter((char) => others.every((str) => str.includes(char)))
		.join("");
}

function calculatePriority(item: string) {
	const charCode = item.toLowerCase().codePointAt(0)! - LOWERCASE_A_CHAR_CODE + 1;

	if (item === item.toUpperCase()) {
		return charCode + ALPHABET_RANGE;
	}

	return charCode;
}

function groupArray<T>(arr: T[]) {
	const result = [] as [T, T, T][];

	for (let idx = 0; idx < arr.length; idx += 3) {
		result.push(arr.slice(idx, idx + 3) as [T, T, T]);
	}

	return result;
}
