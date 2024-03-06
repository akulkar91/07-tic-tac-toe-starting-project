import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handlePlayerClick(rowIndex, colIndex) {
    setGameBoard((prevBoard) => {
      const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = "X";
      return updatedBoard;
    });
  }
  return (
    <ol id="game-board">
      {gameBoard?.map((row, rowindex) => (
        <li key={rowindex}>
          <ol>
            {row?.map((playerSymbol, playerIndex) => (
              <li key={playerIndex}>
                <button
                  onClick={() => handlePlayerClick(rowindex, playerIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
