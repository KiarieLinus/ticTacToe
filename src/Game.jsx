import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const rowStyle = {
  'display': 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'black',
  'cursor': 'pointer'
}

const boardstyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
  'cursor': 'pointer'
}


function Square(props) {
  return (
    <div
      className='square'
      style={squareStyle}
      onClick={props.handleClick}>
      <h3>{props.value}</h3>
    </div>
  );
}


function Board() {

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const initSquareValues = [...Array(9)];
  const [squareValues, setSquareValues] = useState(initSquareValues);

  const [gameOver, setGameOver] = useState({ isOver: false, winner: "None" });
  const [count, setCount] = useState(0);


  function resetGame() {
    setCount(0)
    setGameOver({ isOver: false, winner: "None" })
    setSquareValues(initSquareValues)
    setCurrentPlayer("X")
  }

  (count === 9 && !gameOver.isOver) && setGameOver(prev => (
    {
      ...prev,
      isOver: true
    }
  ));

  !gameOver.isOver && (count !== 0 && count >= 3) &&
    calculateWinner(squareValues);

  function handleClick(id) {
    !gameOver.isOver &&
      setSquareValues(prevValues =>
        prevValues.map((val, index) => {
          if (index === id && typeof val === "undefined") {
            setCount(prevCount => prevCount + 1)
            return currentPlayer
          } else { return val }
        }
        )
      );

    !gameOver.isOver && setCurrentPlayer(prevPlayer =>
      prevPlayer === "X" ? "O" : "X"
    );

  }

  function calculateWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < winningPatterns.length; i++) {
      const element = winningPatterns[i];
      const val1 = squares[element[0]]
      const val2 = squares[element[1]]
      const val3 = squares[element[2]]
      if (typeof val1 === "string" &&
        typeof val2 === "string" &&
        typeof val3 === "string") {
        if (val1 == val2 && val2 == val3) {
          return (
            setGameOver(() => (
              {
                isOver: true,
                winner: val1
              }
            )
            )
          )
        }
      }
    }
  }

  return (
    <div style={containerStyle} className='gameBoard'>
      <div
        id="statusArea"
        className="status"
        style={instructionsStyle}>
        <i>
          The first player to go places an X anywhere on
          the board by clicking a square,
          and then the next player will be able to place an O,
          and it continues alternating to a win or  draw.
        </i>
      </div>

      <div
        id="winnerArea"
        className="winner"
        style={instructionsStyle}>
        {gameOver.isOver && <h2>Winner : {gameOver.winner}</h2>}
      </div>
      <button style={buttonStyle} onClick={resetGame}>Reset</button>
      <div style={boardstyle}>
        <div className='board-row' style={rowStyle}>
          <Square id="0" value={squareValues[0] || ""} handleClick={() => handleClick(0)} />
          <Square id="1" value={squareValues[1] || ""} handleClick={() => handleClick(1)} />
          <Square id="2" value={squareValues[2] || ""} handleClick={() => handleClick(2)} />
        </div>
        <div className='board-row' style={rowStyle}>
          <Square id="3" value={squareValues[3] || ""} handleClick={() => handleClick(3)} />
          <Square id="4" value={squareValues[4] || ""} handleClick={() => handleClick(4)} />
          <Square id="5" value={squareValues[5] || ""} handleClick={() => handleClick(5)} />
        </div>
        <div className='board-row' style={rowStyle}>
          <Square id="6" value={squareValues[6] || ""} handleClick={() => handleClick(6)} />
          <Square id="7" value={squareValues[7] || ""} handleClick={() => handleClick(7)} />
          <Square id="8" value={squareValues[8] || ""} handleClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className='game-board'>
        <Board />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Game />
)
