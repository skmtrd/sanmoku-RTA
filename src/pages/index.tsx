import { useState } from 'react';
import styles from './index.module.css';

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

const Home = () => {
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [color, setColor] = useState<number>(1);

  const handleClick = (x: number, y: number) => {
    const newBoard = structuredClone(board);
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
      alert();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => handleClick(x, y)}>
              {cell === 1 && <div className={styles.cellColorBlue} />}
              {cell === 2 && <div className={styles.cellColorRed} />}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
