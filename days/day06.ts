import { DayResolver } from "../day.base";

export default class Day06 extends DayResolver {
  constructor(input: string) {
    super(input, "\n");
  }

  async solveFirstStar() {
    const input = this.getInput();
    const mappedMaxValues = input.map((line) => {
      const [duration, record] = line.split(",").map((item) => +item);
      const finalValues = [];
      for (let i = 1; i < duration - 1; i++) {
        const distance = i * (duration - i);
        if (distance > record) {
          finalValues.push(distance);
        }
      }

      return finalValues.length;
    });

    return mappedMaxValues.reduce((prev, curr) => prev * curr);
  }

  async solveSecondStar() {
    const input = this.getInput();

    return 0;
  }
}
