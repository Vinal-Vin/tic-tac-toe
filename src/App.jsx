import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isUserTurn, setIsUserTurn] = useState(true)
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'userWin', 'cpuWin', 'draw'
  const [winner, setWinner] = useState(null)

  // Check for winner
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  // Check if board is full
  const isBoardFull = (squares) => {
    return squares.every(square => square !== null)
  }

  // CPU logic
  const getCPUMove = (squares) => {
    // Add some randomness - 20% chance CPU makes a random move (easier difficulty)
    if (Math.random() < 0.2) {
      const availableMoves = squares.map((square, index) => square === null ? index : null).filter(val => val !== null)
      if (availableMoves.length > 0) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      }
    }

    // Check if CPU can win (always try to win)
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const testBoard = [...squares]
        testBoard[i] = 'O'
        if (checkWinner(testBoard) === 'O') {
          return i
        }
      }
    }

    // Check if CPU needs to block user (90% chance to block)
    if (Math.random() < 0.9) {
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          const testBoard = [...squares]
          testBoard[i] = 'X'
          if (checkWinner(testBoard) === 'X') {
            return i
          }
        }
      }
    }

    // Strategic moves in order of preference
    // Take center if available (80% chance)
    if (squares[4] === null && Math.random() < 0.8) {
      return 4
    }

    // Take corners (preferred)
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter(corner => squares[corner] === null)
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)]
    }

    // Take center if we didn't take it before
    if (squares[4] === null) {
      return 4
    }

    // Take any available side
    const sides = [1, 3, 5, 7]
    const availableSides = sides.filter(side => squares[side] === null)
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)]
    }

    return null
  }

  // Handle user move
  const handleCellClick = (index) => {
    if (board[index] || gameStatus !== 'playing' || !isUserTurn) {
      return
    }

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsUserTurn(false)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameStatus(gameWinner === 'X' ? 'userWin' : 'cpuWin')
    } else if (isBoardFull(newBoard)) {
      setGameStatus('draw')
    }
  }

  // CPU move effect
  useEffect(() => {
    if (!isUserTurn && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        const cpuMoveIndex = getCPUMove(board)
        if (cpuMoveIndex !== null) {
          const newBoard = [...board]
          newBoard[cpuMoveIndex] = 'O'
          setBoard(newBoard)

          const gameWinner = checkWinner(newBoard)
          if (gameWinner) {
            setWinner(gameWinner)
            setGameStatus(gameWinner === 'X' ? 'userWin' : 'cpuWin')
          } else if (isBoardFull(newBoard)) {
            setGameStatus('draw')
          } else {
            setIsUserTurn(true)
          }
        }
      }, 500) // CPU thinks for 500ms

      return () => clearTimeout(timer)
    }
  }, [isUserTurn, board, gameStatus])

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsUserTurn(true)
    setGameStatus('playing')
    setWinner(null)
  }

  // Get status message and class
  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'userWin':
        return 'You Win! 🎉'
      case 'cpuWin':
        return 'CPU Wins! 🤖'
      case 'draw':
        return "It's a Draw! 🤝"
      default:
        return isUserTurn ? 'Your Turn' : 'CPU Thinking...'
    }
  }

  const getStatusClass = () => {
    switch (gameStatus) {
      case 'userWin':
        return 'win'
      case 'cpuWin':
        return 'lose'
      case 'draw':
        return 'draw'
      default:
        return ''
    }
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="game-info">
        <p className={`status ${getStatusClass()}`}>{getStatusMessage()}</p>
        <div className="players">
          <span className={`player-indicator ${isUserTurn && gameStatus === 'playing' ? 'active' : ''}`}>
            🎮 You: X
          </span>
          <span className={`player-indicator ${!isUserTurn && gameStatus === 'playing' ? 'active' : ''}`}>
            🤖 CPU: O
          </span>
        </div>
      </div>
      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? 'filled' : ''} ${cell === 'X' ? 'x-mark' : ''} ${cell === 'O' ? 'o-mark' : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={!isUserTurn || gameStatus !== 'playing'}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  )
}

export default App
