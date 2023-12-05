import { DayResolver } from "../day.base";
import { Mutex } from "async-mutex";

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
  parseCards(input: string[]) {
    const cards: Card[] = [];
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

      cards.push(categoryMappedValues);
    });
    return cards;
  }
  seedToLocation(seed: number, cards: Card[]) {
    let currentValue = seed;
    cards.forEach((category) => {
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
  }
  getMappedSeedToLocations(seeds: number[], cards: Card[]) {
    return seeds.map((seed) => this.seedToLocation(seed, cards));
  }
  async solveFirstStar() {
    const input = this.getInput();
    const seeds = input[0]
      .split(": ")[1]
      .split(" ")
      .map((number) => +number);
    const cards = this.parseCards(input);
    const mappedSeedToLocations = this.getMappedSeedToLocations(seeds, cards);

    return Math.min(...mappedSeedToLocations);
  }

  async solveSecondStar() {
    const input = this.getInput();

    // const seedsRanges = input[0]
    //   .split(": ")[1]
    //   .split(" ")
    //   .map((number) => +number);

    // const cards = this.parseCards(input);
    // let minLocation = Infinity;
    // const minLocationMutex = new Mutex();

    // const processSeed = async (seed: number) => {
    //   console.log(seed);
    //   const seedToLocation = this.seedToLocation(seed, cards);
    //   const release = await minLocationMutex.acquire();
    //   try {
    //     minLocation = Math.min(minLocation, seedToLocation);
    //   } finally {
    //     release();
    //   }
    // };
    // for (let i = 0; i < seedsRanges.length; i += 2) {
    //   const first = seedsRanges[i];
    //   const second = seedsRanges[i + 1];
    //   for (let j = first; j < first + second; j++) {
    //     await processSeed(j);
    //   }
    // }

    return 0;
  }
}
