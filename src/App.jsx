import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const player1 = "X";
const player2 = "O";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = player1;
  if (gameTurns.length > 0 && gameTurns[0].player === player1) {
    currentPlayer = player2;
  }
  return currentPlayer;
}
function App() {
  const [players, setPlayers] = useState({
    [player1]: "Player 1",
    [player2]: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol =
      gameBoard?.[combination?.[0]?.row]?.[combination?.[0]?.column];
    console.log(firstSymbol);
    const secondSymbol =
      gameBoard?.[combination?.[1]?.row][combination[1].column];
    console.log(secondSymbol);
    const thirdSymbol =
      gameBoard?.[combination?.[2]?.row][combination[2].column];
    console.log(thirdSymbol);

    if (
      firstSymbol &&
      // firstSymbol === player1 &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  let isDraw = gameTurns?.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((active) => (active === player1 ? player2 : player1));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurn = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurn;
    });
  }
  function reset() {
    setGameTurns(() => {
      winner = null;
      // isDraw = false;
      return [];
    });
  }
  function handlePlayerName(symbol, name) {
    setPlayers((prevState) => {
      return {
        ...prevState,
        [symbol]: name,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players[activePlayer]}
            symbol={player1}
            isActive={activePlayer === player1}
            onSave={handlePlayerName}
          />
          <Player
            name={players[activePlayer]}
            symbol={player2}
            isActive={activePlayer === player2}
            onSave={handlePlayerName}
          />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} rematch={reset} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
