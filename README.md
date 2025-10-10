# Tic Tac Toe (React + Vite)

A modern Tic Tac Toe game built with React and Vite. Play against a smart CPU opponent with attractive UI and responsive design.

## Features

- **User vs CPU gameplay** (You are X, CPU is O)
- **User vs User gameplay** (You are X, Player 2 is O) - Upcoming
- **Smart CPU AI**: Tries to win, blocks your moves, and sometimes makes mistakes for a fun challenge
- **Win, draw, and reset detection**
- **Responsive design** for desktop and mobile
- **Modern CSS styling**
- **Fast development experience** with Vite

## Getting Started

### Install dependencies
```bash
npm install
```

### Start the development server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser to play.

## Gameplay
- Click on any empty cell to make your move.
- The CPU will respond after a short delay.
- The game announces win, draw, or loss and allows you to start a new game.

## Project Structure
```
├── public/
├── src/
│   ├── App.jsx        # Main game logic and UI
│   ├── App.css        # Game styling
│   └── ...            # Other assets and files
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization
- You can tweak the AI difficulty in `App.jsx` by adjusting the randomness and strategy logic.
- Style the game further in `App.css`.

---
Built with ❤️ using React and Vite.
