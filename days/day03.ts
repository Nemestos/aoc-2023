import { DayResolver } from "../day.base";
enum CellType {
  BLANK,
  DIGIT,
  SYMBOL,
}

interface Cell {
  type: CellType;
  value: string;
}
type Grid = Cell[][];

export default class Day02 extends DayResolver {
  constructor(input: string[]) {
    super(input);
  }

  getCellType(cellValue: string) {
    if (cellValue === ".") {
      return CellType.BLANK;
    } else if (cellValue.match(/\d/)) {
      return CellType.DIGIT;
    }
    return CellType.SYMBOL;
  }
  tokenizeGrid(lines: string[]) {
    const grid: Grid = [];
    for (let i = 0; i < lines.length; i++) {
      const line: Cell[] = [];
      for (let j = 0; j < lines[i].length; j++) {
        const rawCell = lines[i][j];
        const type = this.getCellType(rawCell);
        line.push({ type, value: rawCell });
      }
      grid.push(line);
    }
    return grid;
  }
  adjacentToSymbol(
    grid: Grid,
    i: number,
    j: number,
    customSymbol: string | null = null,
  ) {
    const rowCount = grid.length;
    const columnCount = grid[0].length;

    const left =
      j > 0 &&
      grid[i][j - 1].type == CellType.SYMBOL &&
      (!customSymbol || grid[i][j - 1].value === customSymbol);
    const leftTopDiag =
      i > 0 &&
      j > 0 &&
      grid[i - 1][j - 1].type == CellType.SYMBOL &&
      (!customSymbol || grid[i - 1][j - 1].value === customSymbol);
    const top =
      i > 0 &&
      grid[i - 1][j].type == CellType.SYMBOL &&
      (!customSymbol || grid[i - 1][j].value === customSymbol);
    const rightTopDiag =
      i > 0 &&
      j < columnCount - 1 &&
      grid[i - 1][j + 1].type == CellType.SYMBOL &&
      (!customSymbol || grid[i - 1][j + 1].value === customSymbol);

    const right =
      j < columnCount - 1 &&
      grid[i][j + 1].type == CellType.SYMBOL &&
      (!customSymbol || grid[i][j + 1].value === customSymbol);
    const rightBottomDiag =
      i < rowCount - 1 &&
      j < columnCount - 1 &&
      grid[i + 1][j + 1].type == CellType.SYMBOL &&
      (!customSymbol || grid[i + 1][j + 1].value === customSymbol);
    const bottom =
      i < rowCount - 1 &&
      grid[i + 1][j].type == CellType.SYMBOL &&
      (!customSymbol || grid[i + 1][j].value === customSymbol);
    const leftBottomDiag =
      i < rowCount - 1 &&
      j > 0 &&
      grid[i + 1][j - 1].type == CellType.SYMBOL &&
      (!customSymbol || grid[i + 1][j - 1].value === customSymbol);

    if (left) {
      return [i, j - 1];
    } else if (leftTopDiag) {
      return [i - 1, j - 1];
    } else if (top) {
      return [i - 1, j];
    } else if (rightTopDiag) {
      return [i - 1, j + 1];
    } else if (right) {
      return [i, j + 1];
    } else if (rightBottomDiag) {
      return [i + 1, j + 1];
    } else if (bottom) {
      return [i + 1, j];
    } else if (leftBottomDiag) {
      return [i + 1, j - 1];
    } else {
      return false;
    }
  }
  solveFirstStar() {
    const input = this.getInput();
    const grid = this.tokenizeGrid(input);
    let validNumbersSum = 0;
    for (let i = 0; i < grid.length; i++) {
      let j = 0;
      const line = grid[i];
      while (j < line.length) {
        const cell = grid[i][j];
        if (cell.type === CellType.DIGIT) {
          const validDigits: boolean[] = [];
          let capturedNumber = "";
          let newColumnIndex = j;
          while (
            newColumnIndex < line.length &&
            line[newColumnIndex].type == CellType.DIGIT
          ) {
            capturedNumber += line[newColumnIndex].value;
            const validity = this.adjacentToSymbol(grid, i, newColumnIndex);
            validDigits.push(validity != false);
            newColumnIndex += 1;
          }
          j = newColumnIndex;
          if (validDigits.some((validity) => validity)) {
            validNumbersSum += +capturedNumber;
          }
        } else {
          j += 1;
        }
      }
    }
    return validNumbersSum;
  }
  solveSecondStar(): number {
    const input = this.getInput();
    const grid = this.tokenizeGrid(input);
    const gearsMap = new Map<string, number[]>();

    for (let i = 0; i < grid.length; i++) {
      let j = 0;
      const line = grid[i];
      while (j < line.length) {
        const cell = grid[i][j];
        if (cell.type === CellType.DIGIT) {
          const gearsSymbols = [];
          let capturedNumber = "";
          let newColumnIndex = j;
          while (
            newColumnIndex < line.length &&
            line[newColumnIndex].type == CellType.DIGIT
          ) {
            capturedNumber += line[newColumnIndex].value;
            const validity = this.adjacentToSymbol(
              grid,
              i,
              newColumnIndex,
              "*",
            );
            if (validity !== false) {
              gearsSymbols.push(validity);
            }
            newColumnIndex += 1;
          }
          j = newColumnIndex;

          if (gearsSymbols.length > 0) {
            const symbol = gearsSymbols[0];
            const serializedSymbol = symbol.join(",");

            const lastArray = gearsMap.get(serializedSymbol) ?? [];
            gearsMap.set(serializedSymbol, [...lastArray, +capturedNumber]);
          }
        } else {
          j += 1;
        }
      }
    }
    return [...gearsMap.values()]
      .filter((arr) => arr.length == 2)
      .flatMap((arr) => arr.reduce((prev, curr) => prev * curr))
      .reduce((prev, curr) => prev + curr);
  }
}
