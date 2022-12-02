export function solvePart1(input: string) {
	return parseInput(input)[0];
}

export function solvePart2(input: string) {
	return parseInput(input)
		.slice(0, 3)
		.reduce((acc, num) => acc + num, 0);
}

function parseInput(input: string) {
	const parsed = input
		.split("\n\n")
		.map((elf) => elf.split("\n"))
		.map((amounts) => amounts.reduce((acc, num) => acc + Number.parseInt(num, 10), 0));

	return parsed.sort((a, b) => b - a);
}
