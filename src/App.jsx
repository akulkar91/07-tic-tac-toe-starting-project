import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

const player1 = "X";
const player2 = "O";
function deriveActivePlayer(gameTurns) {
  let currentPlayer = player1;
  if (gameTurns.length > 0 && gameTurns[0].player === player1) {
    currentPlayer = player2;
  }
  return currentPlayer;
}
function App() {
  // const [activePlayer, setActivePlayer] = useState(player1);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol={player1}
            isActive={activePlayer === player1}
          />
          <Player
            name="Player 2"
            symbol={player2}
            isActive={activePlayer === player2}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
