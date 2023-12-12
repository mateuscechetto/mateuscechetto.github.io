import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../window/window.component';
import { Cell } from './Cell';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'app-minesweeper',
    templateUrl: './minesweeper.component.html',
    styleUrls: ['./minesweeper.component.scss'],
    standalone: true,
    imports: [WindowComponent, NgClass, NgFor, TranslateModule]
})
export class MinesweeperComponent extends WindowComponent implements OnInit {

  windowClasses: string[] = ['minesweeper'];

  mode = {
    "easy": {
      size: 9,
      totalBombs: 10,
      mode: "easy"
    },
    "normal": {
      size: 16,
      totalBombs: 40,
      mode: "normal"
    },
    "hard": {
      size: 20,
      totalBombs: 90,
      mode: "hard"
    }
  };

  activeMode: { size: number, totalBombs: number, mode: string } = this.mode.normal;

  size: number = 16;
  totalBombs: number = 40;
  board: Cell[][] = [];
  bombCount: number = 40;
  bombCountString: string = '040';
  elapsedTime: number = 0;
  elapsedTimeString: string = '000';
  hitBomb: boolean = false;
  timerId: any = null;
  playerWon: boolean = false;

  resetIcon: string = '';

  resetIcons = {
    "playing": "../../assets/images/minesweeper/smiley-face.png",
    "won": "../../assets/images/minesweeper/cool-face.png",
    "lost": "../../assets/images/minesweeper/dead-face.png"
  };

  textColors: string[] = [
    '#C0C0C0',
    '#0000FA',
    '#4B802D',
    '#DB1300',
    '#202081',
    '#690400',
    '#457A7A',
    '#1B1B1B',
    '#7A7A7A',
  ];

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.startGame();
  }

  override closeWindow() {
    super.closeWindow();
    this.startGame();
  }

  startGame() {
    this.size = this.activeMode.size;
    this.totalBombs = this.activeMode.totalBombs;
    this.board = this.buildBoard();
    this.buildCells();
    this.elapsedTime = 0;
    this.elapsedTimeString = '000';
    this.bombCount = this.activeMode.totalBombs;
    this.bombCountString = this.bombCount.toString().padStart(3, '0');
    clearInterval(this.timerId);
    this.timerId = null;
    this.hitBomb = false;
    this.playerWon = false;
    this.resetIcon = this.resetIcons.playing;
  }

  buildBoard(): Cell[][] {
    let array: Cell[][] = Array(this.size).fill(null);
    array = array.map(() => {
      return new Array(this.size).fill(null);
    });
    return array;
  }

  buildCells(): void {
    this.board.forEach((rowArr, rowIdx) => {
      rowArr.forEach((slot, colIdx) => {
        this.board[rowIdx][colIdx] = new Cell(rowIdx, colIdx, this.board);
      });
    });
    this.addBombs();
    this.runCodeForAllCells((cell: Cell) => {
      cell.calculateAdjBombs();
    });
  }

  addBombs(): void {
    let bombsLeft = this.totalBombs;
    while (bombsLeft > 0) {
      let row = Math.floor(Math.random() * this.size);
      let col = Math.floor(Math.random() * this.size);
      let currentCell = this.board[row][col];
      if (!currentCell.hasBomb) {
        currentCell.hasBomb = true;
        bombsLeft--;
      }
    }
  }

  onClickCell(cell: Cell) {
    if (this.playerWon || this.hitBomb) return;
    if (!this.timerId) this.setTimer();
    this.hitBomb = cell.revealAndReturnIfHasBomb();
    if (this.hitBomb) {
      cell.clickedBomb = true;
      this.resetIcon = this.resetIcons.lost;
      this.revealAll();
      clearInterval(this.timerId);
    } else {
      this.playerWon = this.checkIfWon();
      if (this.playerWon) {
        this.endOnWin();
      }

    }

  }

  onRightClick(cell: Cell) {
    if (this.playerWon || this.hitBomb) return;
    if (!this.timerId) this.setTimer();
    if (this.bombCount > 0) {
      this.bombCount += cell.toggleFlag() ? -1 : 1;
      this.bombCountString = this.bombCount.toString().padStart(3, '0');
      if (this.bombCount == 0) {
        this.playerWon = this.checkIfWonFlags();
        if (this.playerWon) {
          this.endOnWin();
        }
      }
    } else {
      if (cell.flagged) {
        cell.toggleFlag();
        this.bombCount++;
        this.bombCountString = this.bombCount.toString().padStart(3, '0');
      }
    }

    return false;
  }

  setTimer() {
    this.timerId = setInterval(() => {
      this.elapsedTime += 1;
      this.elapsedTimeString = this.elapsedTime.toString().padStart(3, '0');
    }, 1000);
  }

  revealAll() {
    this.board.forEach((rowArr) => {
      rowArr.forEach((cell) => {
        cell.revealAndReturnIfHasBomb();
      })
    });
  }

  //TODO 
  checkIfWon(): boolean {
    for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[0].length; col++) {
        var cell = this.board[row][col];
        if (!cell.revealed && !cell.hasBomb) return false;
      }
    }
    return true;
    // return !this.board.some((rowArr) => {
    //   rowArr.some((cell) => {
    //     !cell.revealed && !cell.hasBomb
    //   });
    // });
  }

  checkIfWonFlags(): boolean {
    for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[0].length; col++) {
        var cell = this.board[row][col];
        if (cell.hasBomb && !cell.flagged) return false;
      }
    }
    return true;
  }

  runCodeForAllCells(callback: Function) {
    this.board.forEach((rowArr) => {
      rowArr.forEach((cell) => {
        callback(cell);
      });
    });
  }

  endOnWin() {
    clearInterval(this.timerId);
    this.resetIcon = this.resetIcons.won;
    this.revealAll();
  }

  changeMode(mode: string) {
    this.activeMode = this.mode[mode as keyof typeof this.mode];
    if (mode == 'hard') {
      this.windowClasses.push('sizeHard');
    } else {
      this.windowClasses.length = 1;
    }
    this.startGame();
  }


}
