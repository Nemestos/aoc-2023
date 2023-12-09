import { DayResolver } from "../day.base";

export default class Day09 extends DayResolver {
  constructor(input: string) {
    super(input, "\n");
  }
  getLinesUntilZero(first: number[]) {
    const values = [first];
    while (!values[values.length - 1].every((v) => v == 0)) {
      const newValues = [];
      for (let i = 0; i < values[values.length - 1].length - 1; i++) {
        newValues.push(
          values[values.length - 1][i + 1] - values[values.length - 1][i],
        );
      }
      values.push(newValues);
    }
    return values;
  }
  getNextValue(lines: number[][]) {
    let lastValue = 0;
    for (let i = lines.length - 2; i > -1; i--) {
      const line = lines[i];
      const nextValue = lastValue + line[line.length - 1];
      lastValue = nextValue;
    }
    return lastValue;
  }
  async solveFirstStar() {
    const input = this.getInput();
    const parsed = input.map((line) => line.split(" ").map((value) => +value));

    const predictions = parsed.map((line) => {
      const allLines = this.getLinesUntilZero(line);
      return this.getNextValue(allLines);
    });

    return predictions.reduce((prev, curr) => prev + curr);
  }

  async solveSecondStar() {
    const input = this.getInput();
    const parsed = input.map((line) =>
      line
        .split(" ")
        .map((value) => +value)
        .reverse(),
    );

    const predictions = parsed.map((line) => {
      const allLines = this.getLinesUntilZero(line);
      return this.getNextValue(allLines);
    });

    return predictions.reduce((prev, curr) => prev + curr);
  }
}
