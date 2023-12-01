import { DayResolver } from "../day.base";

export default class Day01 extends DayResolver {
  constructor(input: string[]) {
    super(input);
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
    const NUMBERS_DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const input = this.getInput();
    const numbers = input.map((line) => {
      const regex = new RegExp(`${NUMBERS_STRING.join("|")}|\\d`, "gi");
      const numbers = [...line.matchAll(regex)].map((matched) => matched[0]);
      const convertedNumbers = numbers.map((number) =>
        NUMBERS_DIGITS.includes(number)
          ? number
          : (NUMBERS_STRING.indexOf(number) + 1).toString(),
      );
      return convertedNumbers.length
        ? +(convertedNumbers[0] + convertedNumbers[convertedNumbers.length - 1])
        : 0;
    });

    return numbers.reduce((prev, curr) => prev + curr);
  }
}
