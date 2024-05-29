import { childen, useState } from "react";
import confetti from "canvas-confetti";

const turns = {
  x: "x",
  o: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  //create states
  const [board, setboard] = useState(Array(9).fill(null));
  const [turn, setturn] = useState(turns.x);
  const [winner, setWinner] = useState(null);

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const checkWinner = (boardToCheck) => {
    //revisar todas las combinaciones ganadoras
    //para ver si x u o gano.
    for (const combo of winnerCombos) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setboard(Array(9).fill(null));
    setturn(turns.x);
    setWinner(null);
  };

  const updateBoard = (index) => {
    //no actualizar si ya hay una pasition
    if (board[index] || winner) return;
    //actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setboard(newBoard);
    //study spread y rest operator
    // cambiar el turno
    const newTurn = turn == turns.x ? turns.o : turns.x;
    setturn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } //check si se empata
    else if (checkEndGame(newBoard)) {
      setWinner(false);
      }
    };

    return (
      <main className="board">
        <h1>Tres en Raya</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className="game">
          {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn == turns.x}> {turns.x}</Square>
          <Square isSelected={turn == turns.o}> {turns.o}</Square>
        </section>

        {winner != null && (
          <section className="winner">
            <div className="text">
              <h2>{winner == false ? "Empate" : "Gano " + winner}</h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    );
  };

  export default App;
