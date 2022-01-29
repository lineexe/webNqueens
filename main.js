class Chess {
    constructor() {
        this.board = new Board();
        this.solution = [];
    }


    resolPuzzle() {
        return this.lugarQ(0);
    }

    lugarQ(row) {
        if (row > 7) {
            return true;
        }

        let options = this.mix([0, 1, 2, 3, 4, 5, 6, 7]);

        for (let i = 0; i < options.length; i++) {
            let col = options[i];

            if (this.erroQ(row, col)) {
                continue;
            }

            this.board.squares[row][col].hasQueen = true;

            if (this.lugarQ(row + 1)) {
                this.solution.push(this.board.squares[row][col].id);
                return true;
            }

            this.board.squares[row][col].hasQueen = false;
        }

        return false;
    }


    erroQ(row, col) {
        return this.erroCol(row, col) ||
            this.erroDiaNW(row, col) ||
            this.erroDiaNE(row, col);
    }


    erroCol(row, col) {
        for (let r = row - 1; r >= 0; r--) {
            if (this.board.squares[r][col].hasQueen) {
                return true;
            }
        }

        return false;
    }


    erroDiaNW(row, col) {
        for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
            if (this.board.squares[r][c].hasQueen) {
                return true;
            }
        }

        return false;
    }


    erroDiaNE(row, col) {
        for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
            if (this.board.squares[r][c].hasQueen) {
                return true;
            }
        }

        return false;
    }


    mix(a) {
        let a2 = [];

        while (a.length > 0) {
            let i = Math.floor(Math.random() * a.length);
            a2.push(...a.splice(i, 1));
        }

        return a2;
    }
}

class Board {
    constructor() {
        this.squares = [];

        for (let r = 0; r < 8; r++) {
            let row = [];

            for (let c = 0; c < 8; c++) {
                let square = new Square(r, c);
                row.push(square);
            }

            this.squares.push(row);
        }
    }
}

class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.hasQueen = false;
        this.id = `${row}, ${col}`;
    }
}

let chess = null;

window.onload = () => {
    drawMainBoard();
}

function drawMainBoard() {
    let board = document.getElementById("main-board"),
        classes = ["white-square", "dark-square"];

    for (let row = 0; row < 8; row++) {
        let c = row % 2;

        for (let col = 0; col < 8; col++) {
            let square = document.createElement("div");

            square.className = classes[c] + " " + "square";
            square.id = `${row}, ${col}`;

            board.appendChild(square);
            c = (c + 1) % 2;
        }
    }
}

function showSolution() {
    chess.solution.forEach(id => {
        let square = document.getElementById(id);
        square.innerHTML = '<i class="fas fa-chess-queen"></i>';
    });
}

function clearBoard() {
    if (chess == null) {
        return;
    }

    chess.solution.forEach(id => {
        let square = document.getElementById(id);
        square.innerHTML = '';
    });
}

function Solution() {
    clearBoard();
    chess = new Chess();

    if (!chess.resolPuzzle()) {
        alert("Could not find a solution!");
        return;
    }

    showSolution();
}

