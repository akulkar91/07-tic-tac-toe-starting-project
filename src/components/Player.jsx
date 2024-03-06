import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  const handleEditClick = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  let playerHtml = <span className="player-name"> {playerName} </span>;
  let buttonText = "Edit";
  if (isEditing) {
    playerHtml = (
      <input
        required
        type="text"
        defaultValue={name}
        onChange={handlePlayerNameChange}
        value={playerName}
      />
    );
    buttonText = "Save";
  }
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">{playerHtml}</span>
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleEditClick}>{buttonText}</button>
    </li>
  );
}
