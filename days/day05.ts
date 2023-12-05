import { DayResolver } from "../day.base";

interface MappedRangedValues {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}
interface Card {
  fromCategory: string;
  toCategory: string;
  mappedValues: MappedRangedValues[];
}
export default class Day05 extends DayResolver {
  constructor(input: string) {
    super(input, "\n\n");
  }
  testMappedRangedValuesWithValue(
    value: number,
    mappedRangesValue: MappedRangedValues,
  ) {
    return (
      value >= mappedRangesValue.sourceRangeStart &&
      value <=
        mappedRangesValue.sourceRangeStart + mappedRangesValue.rangeLength
    );
  }
  solveFirstStar() {
    const input = this.getInput();
    const seeds = input[0]
      .split(": ")[1]
      .split(" ")
      .map((number) => +number);
    const categories: Card[] = [];
    input.slice(1).forEach((card) => {
      const [header, ...mappedValues] = card.split("\n");
      const [fromCategory, _to, toCategory] = header.split(" ")[0].split("-");
      const categoryMappedValues: Card = {
        fromCategory: fromCategory!,
        toCategory: toCategory!,
        mappedValues: mappedValues.map((value) => {
          const [destinationRangeStart, sourceRangeStart, rangeLength] = value
            .split(" ")
            .map((v) => +v);
          return {
            destinationRangeStart,
            sourceRangeStart,
            rangeLength,
          };
        }),
      };

      categories.push(categoryMappedValues);
    });
    const mappedSeedToLocations = seeds.map((seed) => {
      let currentValue = seed;
      categories.forEach((category) => {
        let findRange = false;
        let i = 0;
        while (!findRange && i < category.mappedValues.length) {
          const currentMappedRangedValues = category.mappedValues[i];
          if (
            this.testMappedRangedValuesWithValue(
              currentValue,
              currentMappedRangedValues,
            )
          ) {
            findRange = true;
          } else {
            i += 1;
          }
        }
        if (findRange) {
          const finalMappedRangesValues = category.mappedValues[i];
          const diffFromSource =
            currentValue - finalMappedRangesValues.sourceRangeStart;
          currentValue =
            finalMappedRangesValues.destinationRangeStart + diffFromSource;
        }
      });
      return currentValue;
    });

    return Math.min(...mappedSeedToLocations);
  }

  solveSecondStar(): number {
    const input = this.getInput();

    return 0;
  }
}
