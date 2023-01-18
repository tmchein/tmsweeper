import { getMinePositions, positionMatch } from "./mines";

export const TILE_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = getMinePositions(boardSize, numberOfMines);
  console.log(minePositions);
  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const initialStatus = TILE_STATUS.HIDDEN;
      const tile = {
        status: initialStatus,
        x,
        y,
        mine: minePositions.some((p) => positionMatch(p, { x, y })),
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}
