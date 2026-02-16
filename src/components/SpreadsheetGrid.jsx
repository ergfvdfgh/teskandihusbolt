import { useState } from 'react';
import { useGame } from '../context/GameContext';

function Cell({ row, col, value, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(row, col, editValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  return (
    <td className="border border-gray-300 p-1 min-w-24 h-8 bg-white">
      {isEditing ? (
        <input
          type="text"
          className="w-full h-full px-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div
          className="w-full h-full px-1 text-sm flex items-center cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setIsEditing(true);
            setEditValue(value);
          }}
        >
          {value || ' '}
        </div>
      )}
    </td>
  );
}

export default function SpreadsheetGrid() {
  const { state, updateCell } = useGame();
  const { spreadsheet } = state;

  const handleCellUpdate = (row, col, value) => {
    updateCell(row, col, value);
  };

  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Spreadsheet</h2>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 p-2 w-12"></th>
              {columns.map((col) => (
                <th key={col} className="border border-gray-300 bg-gray-100 p-2 font-bold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spreadsheet.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border border-gray-300 bg-gray-100 p-2 font-bold">
                  {rowIndex + 1}
                </th>
                {row.map((cell, colIndex) => (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    value={cell.value}
                    onUpdate={handleCellUpdate}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Kattints egy cellára a szerkesztéshez. Használj képleteket pl.: =SUM(A1:A10)</p>
      </div>
    </div>
  );
}