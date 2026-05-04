import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let matrix = [];
const dict = [];
let finalNumber = 0;
let gameEnd = true;
let roundEnd = false;
let difficulty = "";


console.log("Welcome to 1024 by Hemish Duri and Druvan Bharath")
async function game()
{
    rl.question("What difficulty? hard/med/easy ", type => {
        difficulty = type;
        rl.close();
    });

    if(difficulty = "easy")
    {
        matrix.push([], [], [], [], [], [], [], []);
        dict.push(2, 2, 2, 2, 4, 4, 4, 4, 4, 4);
        gameEnd = false;
    }

    if(difficulty = "med")
    {
        matrix.push([], [], [], []);
        dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 4);
        gameEnd = false;
    }

    if(difficulty = "hard")
    {
        matrix.push([], [], [], []);
        dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
        gameEnd = false;
    }
    else 
    {
        console.log("Invalid input. Please type easy, med, or hard.");
    }
}

function checkLoss() 
{
    for (let r = 0; r < matrix.length; r++) 
    {
        for (let c = 0; c < matrix.length; c++) 
        {
            if (matrix[r][c] === 0) 
            {
                return false;
            }
        }
    }

    for (let r = 0; r < size; r++) 
    {
        for (let c = 0; c < size - 1; c++) {
            if (matrix[r][c] === matrix[r][c + 1]) 
            {
                return false;
            }
        }
    }
    
    for (let c = 0; c < size; c++) 
    {
        for (let r = 0; r < size - 1; r++) 
        {
            if (matrix[r][c] === matrix[r + 1][c]) 
            {
                return false;
            }
        }
    }

    return true; // Board is full and no merges left
}

while(!gameEnd)
{
    while(!roundEnd)
    {
        winCondition();
    }

    rl.question("Would you like to play again, y/n", a => {
        if(a == "n")
        {
            gameEnd = true;
        }
        rl.close();
    });
}

function processMove(dir) {
    let moved = false;
    if (dir === 'a') {
        moved = move();
    } else if (dir === 'w') {
        rotateMatrix();
        rotateMatrix(); 
        rotateMatrix(); 
        moved = move();
        rotateMatrix();
    } else if (dir === 'd') {
        rotateMatrix(); 
        rotateMatrix();
        moved = move();
        rotateMatrix(); 
        rotateMatrix();
    } else if (dir === 's') {
        rotateMatrix();
        moved = move();
        rotateMatrix(); 
        rotateMatrix(); 
        rotateMatrix();
    }
    return moved;
}

// Rotates the matrix 90 degrees clockwise
function rotateMatrix() {
    let newMat = Array.from({ length: size }, () => Array(size).fill(0));
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            newMat[c][size - 1 - r] = matrix[r][c];
        }
    }
    matrix = newMat;
}

function winCondition()
{
    for(let i = 0; i < matrix.length; i++)
    {
        for(let x = 0; x < matrix.length; x++)
        {
            if(matrix[i][x] == finalNumber)
            {
                roundEnd = true;
            }
        }
    }
}

function run()
{
    newMatrix = [];
    for(let i = 0; i < matrix.length; i++)
    {
        rl.question("Enter a key, W/A/S/D", a => {
            newMatrix.push(builder(a));
        });
    }
}

function spawnNumber() 
{
    let emptySpots = [];
    for (let r = 0; r < size; r++) 
        {
        for (let c = 0; c < size; c++) 
            {
            if (matrix[r][c] === 0) 
                {
                emptySpots.push({ r, c });
            }
        }
    }

    if (emptySpots.length > 0) 
    {
        const spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
        const value = dict[Math.floor(Math.random() * dict.length)];
        matrix[spot.r][spot.c] = value;
    }
}

game();