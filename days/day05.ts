import { DayResolver } from "../day.base";
interface CategoryValue {
  category: string;
  value: string;
}
export default class Day05 extends DayResolver {
  constructor(input: string) {
    super(input, "\n\n");
  }

  solveFirstStar() {
    const input = this.getInput();
    console.log(input);
    return 0;
  }

  solveSecondStar(): number {
    const input = this.getInput();

    return 0;
  }
}
