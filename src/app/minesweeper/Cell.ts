export class Cell {
    row: number;
    col: number;
    board: Cell[][];
    hasBomb: boolean = false;
    clickedBomb: boolean = false;
    revealed: boolean = false;
    flagged: boolean = false;
    adjBombs: number = 0;

    constructor(row: number, col: number, board: Cell[][]) {
        this.row = row;
        this.col = col;
        this.board = board;
    }

    public calculateAdjBombs() {
        let adjCells = this.getAdjCells();
        let adjBombs = adjCells.reduce((acc, cell) => {
            return acc + (cell.hasBomb ? 1 : 0);
        }, 0);
        this.adjBombs = adjBombs;

    }

    private getAdjCells(): Cell[] {
        let adj = [];
        let lastRow = this.board.length - 1;
        let lastCol = this.board[0].length - 1;
        if (this.row > 0 && this.col > 0) adj.push(this.board[this.row - 1][this.col - 1]);
        if (this.row > 0) adj.push(this.board[this.row - 1][this.col]);
        if (this.row > 0 && this.col < lastCol) adj.push(this.board[this.row - 1][this.col + 1]);
        if (this.col < lastCol) adj.push(this.board[this.row][this.col + 1]);
        if (this.row < lastRow && this.col < lastCol) adj.push(this.board[this.row + 1][this.col + 1]);
        if (this.row < lastRow) adj.push(this.board[this.row + 1][this.col]);
        if (this.row < lastRow && this.col > 0) adj.push(this.board[this.row + 1][this.col - 1]);
        if (this.col > 0) adj.push(this.board[this.row][this.col - 1]);
        return adj;
    }

    toggleFlag(): boolean {
        if(!this.revealed) {
            this.flagged = !this.flagged;
            return this.flagged;
        }
        return false;
    }

    revealAndReturnIfHasBomb(): boolean {
        if(!this.revealed) {
            this.revealed = true;
            if(this.hasBomb) return true;
            if(this.adjBombs === 0) {
                let adj = this.getAdjCells();
                adj.forEach((cell) => {
                    if(!cell.revealed) cell.revealAndReturnIfHasBomb();
                });
            }
            return false;
        }
        return false;
    }

}