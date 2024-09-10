'use client';

import React, { useState } from 'react';

const checkFinish = (board: number[][], color: number) => {
  const reverseRow: number[][] | null = [[], [], []];
  for (const row of board) {
    if (row.every((cell) => cell === color)) return true;
    for (let i = 0; i < 3; i++) {
      reverseRow[i].push(row[i]);
    }
  }
  for (const row of reverseRow) {
    if (row.every((cell) => cell === color)) return true;
  }
  if (board[0][0] === color && board[1][1] === color && board[2][2] === color) return true;
  if (board[2][0] === color && board[1][1] === color && board[0][2] === color) return true;
  return false;
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a202c',
    color: 'white',
    padding: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    background: 'linear-gradient(to right, #ec4899, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  status: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    padding: '1rem',
    backgroundColor: '#2d3748',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  cell: {
    width: '80px',
    height: '80px',
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a5568',
    border: '2px solid #2d3748',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  resetButton: {
    marginTop: '2rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'semibold',
    color: 'white',
    backgroundColor: '#4a5568',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default function VanillaTicTacToe() {
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [color, setColor] = useState<number>(1);

  const handleClick = (x: number, y: number) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    if (board[y][x] === 1 || board[y][x] === 2) return;
    if (color === 1) {
      newBoard[y][x] = 1;
      setColor(2);
    } else {
      newBoard[y][x] = 2;
      setColor(1);
    }
    setBoard(newBoard);
    if (checkFinish(newBoard, color)) {
      alert(`Player ${color} wins!`);
    }
  };

  const renderSquare = (x: number, y: number) => (
    <div
      style={{
        ...styles.cell,
        color: board[y][x] === 1 ? '#3b82f6' : board[y][x] === 2 ? '#ec4899' : '#718096',
      }}
      onClick={() => handleClick(x, y)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(x, y);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Square ${y * 3 + x + 1}`}
    >
      {board[y][x] === 1 ? 'X' : board[y][x] === 2 ? 'O' : ''}
    </div>
  );

  const status = `次のプレイヤー: ${color === 1 ? 'X' : 'O'}`;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Neon Tic-Tac-Toe</h1>
      <div style={styles.status}>{status}</div>
      <div style={styles.board}>
        {board.map((row, y) =>
          row.map((_, x) => (
            <React.Fragment key={`${x}-${y}`}>{renderSquare(x, y)}</React.Fragment>
          )),
        )}
      </div>
      <button
        style={styles.resetButton}
        onClick={() => {
          setBoard([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ]);
          setColor(1);
        }}
      >
        ゲームをリセット
      </button>
    </div>
  );
}
