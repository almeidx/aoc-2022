import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { solvePart1, solvePart2 } from "./solutions/1.js";

export async function solve(day: number, part: number) {
	const { part1, part2 } = mapDayToSolutions(day);

	const input = await readFile(new URL(`../tests/${day}_input.txt`, import.meta.url), "utf8");

	switch (part) {
		case 1:
			console.log(part1(input));
			break;
		case 2:
			console.log(part2(input));
			break;
	}
}

export function mapDayToSolutions(day: number) {
	switch (day) {
		case 1:
			return { part1: solvePart1, part2: solvePart2 };

		default:
			throw new Error("Day not implemented");
	}
}
