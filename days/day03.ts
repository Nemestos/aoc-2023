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
  adjacentToSymbol(grid: Grid, i: number, j: number) {
    const rowCount = grid.length;
    const columnCount = grid[0].length;

    const left = j > 0 && grid[i][j - 1].type == CellType.SYMBOL;
    const leftTopDiag =
      i > 0 && j > 0 && grid[i - 1][j - 1].type == CellType.SYMBOL;
    const top = i > 0 && grid[i - 1][j].type == CellType.SYMBOL;
    const rightTopDiag =
      i > 0 &&
      j < columnCount - 1 &&
      grid[i - 1][j + 1].type == CellType.SYMBOL;
    const right = j < columnCount - 1 && grid[i][j + 1].type == CellType.SYMBOL;
    const rightBottomDiag =
      i < rowCount - 1 &&
      j < columnCount - 1 &&
      grid[i + 1][j + 1].type == CellType.SYMBOL;
    const bottom = i < rowCount - 1 && grid[i + 1][j].type == CellType.SYMBOL;
    const leftBottomDiag =
      i < rowCount - 1 && j > 0 && grid[i + 1][j - 1].type == CellType.SYMBOL;

    return (
      left ||
      leftTopDiag ||
      top ||
      rightTopDiag ||
      right ||
      rightBottomDiag ||
      bottom ||
      leftBottomDiag
    );
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
          const validDigits = [];
          let capturedNumber = "";
          let newColumnIndex = j;
          while (
            newColumnIndex < line.length &&
            line[newColumnIndex].type == CellType.DIGIT
          ) {
            capturedNumber += line[newColumnIndex].value;
            validDigits.push(this.adjacentToSymbol(grid, i, newColumnIndex));
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
    return 0;
  }
}
