// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];
export default function GameBoard({ onSelectSquare, board }) {
  //   let gameBoard = initialGameBoard;

  //   for (const turn of turns) {
  //     const { square, player } = turn;
  //     const { row, col } = square;
  //     gameBoard[row][col] = player;
  //   }
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //   function handlePlayerClick(rowIndex, colIndex) {
  //     setGameBoard((prevBoard) => {
  //       const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
  //       updatedBoard[rowIndex][colIndex] = activePlayer;
  //       return updatedBoard;
  //     });
  //     onSelectSquare();
  //   }
  return (
    <ol id="game-board">
      {board?.map((row, rowindex) => (
        <li key={rowindex}>
          <ol>
            {row?.map((playerSymbol, playerIndex) => (
              <li key={playerIndex}>
                <button
                  onClick={() => onSelectSquare(rowindex, playerIndex)}
                  disabled={playerSymbol}
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
