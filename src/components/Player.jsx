import { useState } from "react"

export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(name);


    const handleUserChage = (event) => {
        setUser(event.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }
    return (
        <li>
            {
                !isEditing && (
                    <span className="player-name">
                        {user}
                    </span>
                )
            }
            {
                isEditing && <input type="text" onChange={handleUserChage} value={user} />
            }
            <span className="player-symbol">
                {symbol}
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    )
} 