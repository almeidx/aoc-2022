const enum Choice {
	Rock,
	Paper,
	Scissor,
}

const enum RoundPoints {
	Lost = 0,
	Draw = 3,
	Win = 6,
}

const enum WantedOutcome {
	Win,
	Draw,
	Lose,
}

export function solveDay2Part1(input: string) {
	const parsed = parseInput(input).map(([opponent, me]) => [resolveChoice(opponent), resolveChoice(me)] as const);
	return parsed.reduce((acc, [opponent, me]) => calculateRoundPoints(opponent, me) + getChoicePoints(me) + acc, 0);
}

export function solveDay2Part2(input: string) {
	const parsed = parseInput(input).map(
		([opponent, me]) => [resolveChoice(opponent), resolveWantedOutcome(me)] as const,
	);

	return parsed
		.map(([opponent, wantedOutcome]) => [opponent, calculateChoice(opponent, wantedOutcome)] as const)
		.reduce((acc, [opponent, choice]) => calculateRoundPoints(opponent, choice) + getChoicePoints(choice) + acc, 0);
}

function parseInput(input: string): [string, string][] {
	return input.split("\n").map((line) => line.split(" ") as [string, string]);
}

function resolveChoice(choice: string): Choice {
	switch (choice) {
		case "A":
		case "X":
			return Choice.Rock;

		case "B":
		case "Y":
			return Choice.Paper;

		case "C":
		case "Z":
			return Choice.Scissor;

		default:
			throw new Error(`Invalid choice: ${choice}`);
	}
}

function resolveWantedOutcome(outcome: string): WantedOutcome {
	switch (outcome) {
		case "X":
			return WantedOutcome.Lose;

		case "Y":
			return WantedOutcome.Draw;

		case "Z":
			return WantedOutcome.Win;

		default:
			throw new Error(`Invalid outcome: ${outcome}`);
	}
}

function getChoicePoints(choice: Choice) {
	switch (choice) {
		case Choice.Rock:
			return 1;

		case Choice.Paper:
			return 2;

		case Choice.Scissor:
			return 3;
	}
}

function calculateRoundPoints(opponent: Choice, me: Choice): RoundPoints {
	if (opponent === me) {
		return RoundPoints.Draw;
	}

	switch (opponent) {
		case Choice.Rock:
			return me === Choice.Paper ? RoundPoints.Win : RoundPoints.Lost;

		case Choice.Paper:
			return me === Choice.Scissor ? RoundPoints.Win : RoundPoints.Lost;

		case Choice.Scissor:
			return me === Choice.Rock ? RoundPoints.Win : RoundPoints.Lost;
	}
}

function calculateChoice(opponent: Choice, wantedOutcome: WantedOutcome): Choice {
	if (wantedOutcome === WantedOutcome.Draw) {
		return opponent;
	}

	switch (opponent) {
		case Choice.Rock:
			return wantedOutcome === WantedOutcome.Win ? Choice.Paper : Choice.Scissor;

		case Choice.Paper:
			return wantedOutcome === WantedOutcome.Win ? Choice.Scissor : Choice.Rock;

		case Choice.Scissor:
			return wantedOutcome === WantedOutcome.Win ? Choice.Rock : Choice.Paper;
	}
}
