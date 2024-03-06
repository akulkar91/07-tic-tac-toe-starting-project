function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map(({ square, player }) => {
        const { row, col } = square;

        return (
          <li key={`${row}${col}`}>
            {player} selected {row} {col}
          </li>
        );
      })}
    </ol>
  );
}

export default Log;
