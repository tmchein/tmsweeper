import { useState } from "react";
import { createBoard, TILE_STATUS } from "../../utils/board";
import { nearbyTiles } from "../../utils/mines";
import { COLORS } from "../../utils/tileColor";

const Board = ({ boardSize, numberOfMines }) => {
  const initialState = createBoard(boardSize, numberOfMines);
  const [board, setBoard] = useState(initialState);

  // For debugging purposes
  // useEffect(() => {
  //   console.log(board);
  // }, [board]);

  function changeTileStatus(x, y, status, mine) {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      if (status === TILE_STATUS.MINE) {
        return prevBoard;
      }

      if (mine) {
        newBoard[x][y].status = TILE_STATUS.MINE;
        newBoard[x][y].label = "bomb";
        return newBoard;
      }

      if (status === TILE_STATUS.NUMBER) {
        return prevBoard;
      }
      const adjacentTiles = nearbyTiles(newBoard, { x, y });
      const mines = adjacentTiles.filter((t) => t.mine);

      if (mines.length === 0) {
      } else {
        newBoard[x][y].label = mines.length;
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
        row.map(({ status, x, y, mine, label }) => {
          return (
            <button
              key={`tile-${x}-${y}`}
              className={`font-bold text-center w-8 h-8 px-2 
              border-b-4 border-x-0 rounded-md bg-white ${COLORS[label]}`}
              onClick={() => changeTileStatus(x, y, status, mine)}
              onContextMenu={(e) => rcChangeTileStatus(e, x, y, status, mine)}
            >
              {label === "bomb" ? "💣" : label}
            </button>
          );
        })
      )}
    </div>
  );
};

export default Board;
