import { useState } from "react";
import { createBoard, TILE_STATUS } from "../../utils/board";

const Board = ({ boardSize }) => {
  const initialState = createBoard(boardSize);
  const [board, setBoard] = useState(initialState);

  function changeTileStatus(x, y, status) {
    return setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[x][y].status = TILE_STATUS.NUMBER;
      return newBoard;
    });
  }

  function rcChangeTileStatus(e, x, y, status) {
    e.preventDefault();
    return setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      if (status === TILE_STATUS.NUMBER) {
        return newBoard;
      }
      newBoard[x][y].status = TILE_STATUS.MARKED;
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
        row.map(({ status, x, y }) => {
          return (
            <button
              key={`tile-${x}-${y}`}
              className="font-bold text-center w-8 h-8 px-2 
              border-b-4 border-x-0 rounded-md bg-white"
              onClick={() => changeTileStatus(x, y, status)}
              onContextMenu={(e) => rcChangeTileStatus(e, x, y, status)}
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
