import React, { useState } from 'react';

const emptyGrid = Array(9).fill(null).map(() => Array(9).fill(''));

const isValid = (grid, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

const solveSudoku = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === '') {
        for (let num = '1'; num <= '9'; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = '';
          }
        }
        return false;
      }
    }
  }
  return true;
};

const SudokuSolver = () => {
  const [grid, setGrid] = useState(emptyGrid);

  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    if (/^[1-9]?$/.test(value)) {
      const newGrid = grid.map((r, i) => r.map((c, j) => (i === row && j === col ? value : c)));
      setGrid(newGrid);
    }
  };

  const handleSolve = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (solveSudoku(newGrid)) {
      setGrid(newGrid);
    } else {
      alert('No solution exists!');
    }
  };

  const handleReset = () => {
    setGrid(emptyGrid);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: '#007bff' }}>Sudoku Solver</h1>
      <table style={{ borderCollapse: 'collapse', margin: 'auto' }}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid black', width: '50px', height: '50px' }}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                    style={{
                      width: '48px',
                      height: '48px',
                      textAlign: 'center',
                      fontSize: '20px',
                      border: 'none',
                    }}
                    maxLength="1"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSolve} style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Solve</button>
      <button onClick={handleReset} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset</button>
    </div>
  );
};

export default SudokuSolver;
