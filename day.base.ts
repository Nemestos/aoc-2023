export abstract class DayResolver {
  private input: string[];

  constructor(input: string[]) {
    this.input = input;
  }

  abstract solveFirstStar(): number;
  abstract solveSecondStar(): number;

  getInput(): string[] {
    return this.input;
  }
}
