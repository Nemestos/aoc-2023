import { DayResolver } from "../day.base";

export default class Day01 extends DayResolver {
  constructor(input: string) {
    super(input, "\n");
  }

  solveFirstStar() {
    const input = this.getInput();

    const numbers = input.map((line) => {
      const digits = line.split("").filter((letter) => letter.match(/\d/));
      return digits.length ? +(digits[0] + digits[digits.length - 1]) : 0;
    });
    return numbers.reduce((prev, curr) => prev + curr);
  }
  solveSecondStar(): number {
    const NUMBERS_STRING = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const input = this.getInput();
    const numbers: number[] = [];
    input.forEach((line) => {
      const digits: string[] = [];

      line.split("").forEach((letter, letterIndex) => {
        if (letter.match(/\d/)) {
          digits.push(letter);
        }
        NUMBERS_STRING.forEach((number, numberIndex) => {
          if (line.slice(letterIndex).startsWith(number)) {
            digits.push((numberIndex + 1).toString());
          }
        });
      });
      numbers.push(+(digits[0] + digits[digits.length - 1]));
    });

    return numbers.reduce((prev, curr) => prev + curr);
  }
}
