import { useEffect, useState } from "react";
import { createBoard, TILE_STATUS } from "../../utils/board";

const Board = ({ boardSize, numberOfMines }) => {
  const initialState = createBoard(boardSize, numberOfMines);
  const [board, setBoard] = useState(initialState);

  // For debugging purposes
  useEffect(() => {
    console.log(board);
  }, [board]);

  function changeTileStatus(x, y, status, mine) {
    return setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      if (status === TILE_STATUS.MINE) {
        return prevBoard;
      }

      if (mine) {
        newBoard[x][y].status = TILE_STATUS.MINE;
        return newBoard;
      }

      if (status === TILE_STATUS.NUMBER) {
        return prevBoard;
      }

      newBoard[x][y].status = TILE_STATUS.NUMBER;
      return newBoard;
    });
  }

  function rcChangeTileStatus(e, x, y, status, mine) {
    e.preventDefault();
    return setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      if (status === TILE_STATUS.NUMBER || mine) {
        return prevBoard;
      }

      if (status === TILE_STATUS.MARKED) {
        newBoard[x][y].status = TILE_STATUS.HIDDEN;
      } else {
        newBoard[x][y].status = TILE_STATUS.MARKED;
      }

      return newBoard;
    });
  }

  return (
    <div
      className="bg-[#DDEEDC] inline-grid p-3 gap-1 rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0,1fr))`,
        gridTemplateRows: `repeat(${boardSize}, minmax(0,1fr))`,
      }}
    >
      {board.map((row) =>
        row.map(({ status, x, y, mine }) => {
          return (
            <button
              key={`tile-${x}-${y}`}
              className="font-bold text-center  h-8 px-2 
              border-b-4 border-x-0 rounded-md bg-white"
              onClick={() => changeTileStatus(x, y, status, mine)}
              onContextMenu={(e) => rcChangeTileStatus(e, x, y, status, mine)}
            >
              {status}
            </button>
          );
        })
      )}
    </div>
  );
};

export default Board;
