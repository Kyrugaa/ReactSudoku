import React, { useState } from 'react';
import './App.css';



function Sudoku() {
  // Sudoku-Gitter initialisieren
  var board = [
    [' ', '5', '1', '3', '6', '2', '7', ' ', ' '],
    [' ', '4', ' ', ' ', '5', '8', ' ', ' ', ' '],
    [' ', ' ', ' ', '4', ' ', ' ', ' ', '2', '5'],
    [' ', '8', ' ', ' ', ' ', ' ', '9', ' ', '3'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['7', ' ', '5', ' ', ' ', ' ', ' ', '8', ' '],
    ['1', '2', ' ', ' ', ' ', '9', ' ', ' ', ' '],
    [' ', ' ', ' ', '2', '8', ' ', ' ', '6', ' '],
    [' ', ' ', '8', '5', '3', '4', '2', '9', ' ']
  ]

  // Nimmt board als input und sucht nach erste leere position
  function nextEmptySpot(board){
    for(var i = 0; i < 9; i++){
      for(var j = 0; j< 9; j++){
        if(board[i][j] === 0)
        return [i][j]
      }
    }
    return [-1][-1]
  }

  // Nimmt board Argument für die Reihe die wir checken und einen neuen Wert geben wollen
  function checkRow(board, row, value){
    for(var i = 0; i < board[row].length; i++){
      if(board[row][i] === value){
        return false
      }
    }
      return true
  }

  // Nimmt board Argument für die Spalte die wir checken und einen neuen Wert geben wollen
  function checkColumn(board, col, value){
    for(var i = 0; i < board[col].length; i++){
      if(board[col][i] === value){
        return false
      }
    }
      return true
  }
    var [BoxRow, setBoxRow] = useState()
    var [BoxCol, setBoxCol] = useState()

  // Nimmt board Argument für das Square und schaut ob schon vorhanden
  function zahlMoeglich(row, col, zahl){
    for(let i = 0; i<9;i++){
      if(board [row][i] == zahl){
        return false
      }
      if(board [i][col] == zahl){
        return false
      }
    }
    let startCol = Math.floor(col / 3)*3;
    let startRow = Math.floor(row / 3)*3;

    for(var r = 0; r < 3; r++){
      for(var c = 0; c < 3; c++){
        if(board[startRow + r][startCol + c] == zahl){
          return false
        }
      }
    }
    return true
  }


  // Lösung finden (Backtracking)
  function solve(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(board[i][j] == ' '){
          for(let x = 1; x<10; x++){
            if(zahlMoeglich(i, j, x) == true){
              board[i][j] = x
              solve()
              board[i][j] = ' '
            }            
          }
          return
        }
      }
    }
    for(let i = 0; 0<9;i++){
      console.log(board[i][0], board[i][1], board[i][2], board[i][3], board[i][4], board[i][5], board[i][6], board[i][7], board[i][8],)
    }
  }


  // Alle check-Funktionen zusammenbringen
  function checkValue(board, row, col, value){
    if(checkRow(board, row, value) && 
      checkColumn(board, col, value) && 
      zahlMoeglich(board, row, col, value)){
      return true
    }
    return false
  }



  // zustand um Sudoku-Gitter zu speichern
  const [sudokuGrid, setSudokuGrid] = useState(board);


  // ändern einer Zelle im Sudoku-Gitter
  function updateCell(row, col, value) {
    const newGrid = [...sudokuGrid];    //kopieren des aktuellen gitters
    newGrid[row][col] = value;          //aktualisieren der Zelle mit neuem Wert
    setSudokuGrid(newGrid);             //aktualisieren des Zustands mit dem neuen Gitter
  }





  return (
    <div id='div'>
      <button onClick={solve}>Go</button>
      {sudokuGrid.map(function(row, rowIndex) {
        return (
          <div key={rowIndex}>
            {row.map(function(cell, colIndex) {
              return (
                <input id='input'
                  key={colIndex}
                  type="number"
                  value={cell}
                  onChange={function(e) {
                    let zahl = parseInt(e.target.value)
                    console.log("zahlMöglich: ", zahlMoeglich(rowIndex,colIndex,zahl))
                    updateCell(rowIndex, colIndex, parseInt(e.target.value, 10));
                  }}
                  min="1"
                  max="9"
                />
                );
            })}
             
          </div>
        );
      })}
    </div>
  );
  
}
export default Sudoku;