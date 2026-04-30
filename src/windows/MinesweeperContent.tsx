import React, { useState, useEffect, useCallback } from "react";
import type { Theme } from '../types';

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

type GameState = "playing" | "won" | "lost";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-700",
  2: "text-green-700",
  3: "text-red-600",
  4: "text-blue-900",
  5: "text-red-900",
  6: "text-teal-600",
  7: "text-black",
  8: "text-gray-500",
};

function createEmptyGrid(): CellState[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );
}

function placeMines(
  grid: CellState[][],
  safeRow: number,
  safeCol: number
): CellState[][] {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
  let placed = 0;

  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);

    if (newGrid[r][c].isMine) continue;
    if (Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1) continue;

    newGrid[r][c].isMine = true;
    placed++;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (newGrid[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            newGrid[nr][nc].isMine
          ) {
            count++;
          }
        }
      }
      newGrid[r][c].adjacentMines = count;
    }
  }

  return newGrid;
}

function revealCell(
  grid: CellState[][],
  row: number,
  col: number
): CellState[][] {
  const newGrid = grid.map((r) => r.map((c) => ({ ...c })));

  const stack: [number, number][] = [[row, col]];

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
    if (newGrid[r][c].isRevealed || newGrid[r][c].isFlagged) continue;

    newGrid[r][c].isRevealed = true;

    if (newGrid[r][c].adjacentMines === 0 && !newGrid[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }

  return newGrid;
}

function checkWin(grid: CellState[][]): boolean {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!grid[r][c].isMine && !grid[r][c].isRevealed) return false;
    }
  }
  return true;
}

function countFlags(grid: CellState[][]): number {
  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].isFlagged) count++;
    }
  }
  return count;
}

function formatNumber(num: number): string {
  if (num < 0) return "-" + String(Math.abs(num)).padStart(2, "0");
  return String(num).padStart(3, "0");
}

export const MinesweeperContent = ({ theme }: { theme?: Theme }) => {
  const [grid, setGrid] = useState<CellState[][]>(createEmptyGrid);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [timer, setTimer] = useState(0);
  const [firstClick, setFirstClick] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const isMacos = theme === 'macos';

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimer((t) => Math.min(t + 1, 999));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const resetGame = useCallback(() => {
    setGrid(createEmptyGrid());
    setGameState("playing");
    setTimer(0);
    setFirstClick(true);
    setTimerActive(false);
  }, []);

  const handleLeftClick = useCallback(
    (row: number, col: number) => {
      if (gameState !== "playing") return;
      if (grid[row][col].isRevealed || grid[row][col].isFlagged) return;

      let currentGrid = grid;

      if (firstClick) {
        currentGrid = placeMines(grid, row, col);
        setFirstClick(false);
        setTimerActive(true);
      }

      const newGrid = revealCell(currentGrid, row, col);

      if (newGrid[row][col].isMine) {
        const lossGrid = newGrid.map((r) =>
          r.map((c) => ({
            ...c,
            isRevealed: c.isMine ? true : c.isRevealed,
          }))
        );
        setGrid(lossGrid);
        setGameState("lost");
        setTimerActive(false);
        return;
      }

      setGrid(newGrid);

      if (checkWin(newGrid)) {
        setGameState("won");
        setTimerActive(false);
        const winGrid = newGrid.map((r) =>
          r.map((c) => (c.isMine ? { ...c, isFlagged: true } : c))
        );
        setGrid(winGrid);
      }
    },
    [grid, gameState, firstClick]
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if (gameState !== "playing") return;
      if (grid[row][col].isRevealed) return;

      const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
      newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
      setGrid(newGrid);
    },
    [grid, gameState]
  );

  const mineCount = MINES - countFlags(grid);
  const face =
    gameState === "won" ? "😎" : gameState === "lost" ? "😵" : "😊";

  return (
    <div className={`p-1 select-none flex flex-col h-full ${isMacos ? 'bg-transparent' : 'bg-[#c0c0c0]'}`}>
      {/* Header bar */}
      <div className={`p-1.5 mb-1 ${isMacos ? 'bg-black/5 rounded-xl border border-black/5' : 'retro-border-thin-inset bg-[#c0c0c0]'}`}>
        <div className="flex items-center justify-between">
          {/* Mine counter */}
          <div className={`font-mono text-lg font-bold px-1.5 py-0.5 min-w-[3rem] text-center ${
            isMacos ? 'bg-white rounded-lg border border-black/10 text-gray-800' : 'retro-border-thin-inset bg-black text-red-500'
          }`}>
            {formatNumber(mineCount)}
          </div>

          {/* Face button */}
          <button
            onClick={resetGame}
            className={`w-10 h-10 flex items-center justify-center text-xl transition-all ${
              isMacos ? 'bg-white rounded-full shadow-md hover:scale-110 active:scale-95' : 'retro-border-thin bg-[#c0c0c0] active:retro-border-thin-inset'
            }`}
          >
            {face}
          </button>

          {/* Timer */}
          <div className={`font-mono text-lg font-bold px-1.5 py-0.5 min-w-[3rem] text-center ${
            isMacos ? 'bg-white rounded-lg border border-black/10 text-gray-800' : 'retro-border-thin-inset bg-black text-red-500'
          }`}>
            {formatNumber(timer)}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={`p-1.5 flex-1 flex items-start justify-center ${isMacos ? 'bg-black/5 rounded-2xl border border-black/5' : 'retro-border-thin-inset'}`}>
        <div
          className="inline-grid gap-[1px]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 28px)`,
            gridTemplateRows: `repeat(${ROWS}, 28px)`,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isRevealed = cell.isRevealed;
              const isFlagged = cell.isFlagged;
              const isExploded =
                gameState === "lost" && cell.isMine && cell.isRevealed;

              return (
                <button
                  key={`${r}-${c}`}
                  className={`w-7 h-7 flex items-center justify-center text-sm font-bold leading-none transition-all ${
                    isRevealed
                      ? isExploded
                        ? "bg-red-500 text-white shadow-inner"
                        : isMacos ? "bg-white/40 shadow-inner" : "bg-[#c0c0c0] retro-border-thin-inset"
                      : isMacos 
                        ? "bg-blue-500 rounded-sm hover:bg-blue-600 shadow-sm" 
                        : "retro-border-thin bg-[#c0c0c0] hover:brightness-95"
                  }`}
                  onClick={() => handleLeftClick(r, c)}
                  onContextMenu={(e) => handleRightClick(e, r, c)}
                  disabled={gameState !== "playing"}
                >
                  {isRevealed ? (
                    cell.isMine ? (
                      <span className="text-black text-base">💣</span>
                    ) : cell.adjacentMines > 0 ? (
                      <span
                        className={`font-sans font-extrabold ${
                          NUMBER_COLORS[cell.adjacentMines]
                        }`}
                      >
                        {cell.adjacentMines}
                      </span>
                    ) : null
                  ) : isFlagged ? (
                    <span className="text-base">🚩</span>
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
