import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

// global constants
const PLAYER1 = "X";
const PLAYER2 = "O";
const INITIAL_PLAYERS = {
  [PLAYER1]: "Player 1",
  [PLAYER2]: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// helpers
function deriveActivePlayer(gameTurns) {
  let currentPlayer = PLAYER1;
  if (gameTurns.length > 0 && gameTurns[0].player === PLAYER1) {
    currentPlayer = PLAYER2;
  }
  return currentPlayer;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol =
      gameBoard?.[combination?.[0]?.row]?.[combination?.[0]?.column];
    const secondSymbol =
      gameBoard?.[combination?.[1]?.row][combination[1].column];
    const thirdSymbol =
      gameBoard?.[combination?.[2]?.row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  // state
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // variables
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  let winner = deriveWinner(gameBoard, players);
  let isDraw = gameTurns?.length === 9 && !winner;

  // handlers
  function handleSelectSquare(rowIndex, colIndex) {
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
    winner = null;
    setGameTurns([]);
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
            symbol={PLAYER1}
            isActive={activePlayer === PLAYER1}
            onSave={handlePlayerName}
          />
          <Player
            name={players[activePlayer]}
            symbol={PLAYER2}
            isActive={activePlayer === PLAYER2}
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
