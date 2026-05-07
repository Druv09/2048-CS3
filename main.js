import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let matrix = [];
let dict = [];
let finalNumber = 2048;
let gameEnd = true;
let roundEnd = false;
let difficulty = "";
let size = 0;

console.log("Welcome to 2048 by Druvan Bharath and Hemish Duri")

async function game()
{
    difficulty = await rl.question("What difficulty? hard/med/easy ");

    matrix = [];
    dict = [];

    if(difficulty === "easy")
    {
        size = 8;
        dict.push(2, 2, 2, 2, 4, 4, 4, 4, 4, 4);
    }
    else if(difficulty === "med")
    {
        size = 4;
        dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 4);
    }
    else if(difficulty === "hard")
    {
        size = 3;
        dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
    }
    else if(difficulty === "test")
    {
        size = 3;
        finalNumber = 16;
        dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
    }
    else if(difficulty === "help")
    {
        console.log("Easy: 6x6 board, 2s and 4s spawn, final number is 512");
        console.log("Med: 4x4 board, 2s and 4s spawn but 2s are more much likely, final number is 512");
        console.log("Hard: 3x3 board, 2s only, final number is 2048");
        console.log("Test: testing purposes only");
        game();
    }
    else
    {
        console.log("Invalid input. Please type easy, med, or hard.");
        return game();
    }

    for(let r = 0; r < size; r++)
    {
        matrix.push(new Array(size).fill(0));
    }
    
    spawnNumber();
    spawnNumber();
    play();
}

function checkLoss()
{
    for(let r = 0; r < size; r++)
    {
        for(let c = 0; c < size; c++)
        {
            if(matrix[r][c] === 0)
            {
                return false;
            }
        }
    }

    for(let r = 0; r < size; r++)
    {
        for(let c = 0; c < size - 1; c++)
        {
            if(matrix[r][c] === matrix[r][c + 1])
            {
                return false;
            }
        }
    }
    
    for(let c = 0; c < size; c++)
    {
        for(let r = 0; r < size - 1; r++)
        {
            if(matrix[r][c] === matrix[r + 1][c])
            {
                return false;
            }
        }
    }

    return true;
}

async function play()
{
    while(true)
    {
        printArray();

        if(winCondition())
        {
            console.log("You won!");
            break;
        }
        if(checkLoss())
        {
            console.log("Game Over! No more moves available.");
            break;
        }

        const moveInput = await rl.question("do w, a, s, d: ");
        if(processMove(moveInput))
        {
            if(difficulty === "hard")
            {
                spawnNumber();
            }
            if(difficulty === "med")
            {
                spawnNumber();
                spawnNumber();
            }
            if(difficulty === "easy")
            {
                spawnNumber();
                spawnNumber();
                spawnNumber();
                spawnNumber();
            }
            if(difficulty === "test")
            {
                spawnNumber();
            }
        }
    }

    const d = await rl.question("Would you like to play again? y for yes, anything else for no ");
    if(d.toLowerCase() === 'y')
    {
        game();
    }
    else
    {
        console.log("Thanks for playing!");
        rl.close();
    }
}

function processMove(a)
{
    let moved = false;
    if(a === 'a')
    {
        moved = move();
    }
    else if(a === 'w')
    {
        rotateMatrix();
        rotateMatrix(); 
        rotateMatrix(); 
        moved = move();
        rotateMatrix();
    }
    else if(a === 'd')
    {
        rotateMatrix(); 
        rotateMatrix();
        moved = move();
        rotateMatrix(); 
        rotateMatrix();
    }
    else if(a === 's')
    {
        rotateMatrix();
        moved = move();
        rotateMatrix(); 
        rotateMatrix(); 
        rotateMatrix();
    }
    return moved;
}

function move()
{
    let moved = false;
    for(let r = 0; r < size; r++)
    {
        let row = [];
        for(let i = 0; i < matrix[r].length; i++)
        {
            if(!(matrix[r][i] === 0))
            {
                row.push(matrix[r][i])
            }
        }
        let newRow = [];
        for(let i = 0; i < row.length; i++)
        {
            if(row[i] === row[i + 1])
            {
                newRow.push(row[i] * 2);
                i++; 
                moved = true;
            }
            else
            {
                newRow.push(row[i]);
            }
        }
        
        while(newRow.length < size)
        {
            newRow.push(0);
        }
        
        for(let c = 0; c < size; c++)
        {
            if(matrix[r][c] !== newRow[c])
            {
                moved = true;
            }
            matrix[r][c] = newRow[c];
        }
    }
    return moved;
}

function rotateMatrix()
{
    let newMat = Array.from({length:size}, () => Array(size).fill(0));
    for(let r = 0; r < size; r++)
    {
        for(let c = 0; c < size; c++)
        {
            newMat[c][size - 1 - r] = matrix[r][c];
        }
    }
    matrix = newMat;
}

function winCondition()
{
    for(let i = 0; i < size; i++)
    {
        for(let x = 0; x < size; x++)
        {
            if(matrix[i][x] >= x)
            {
                return true;
            }
        }
    }
    return false;
}

function spawnNumber()
{
    let emptySpots = [];
    for(let r = 0; r < size; r++)
    {
        for(let c = 0; c < size; c++)
        {
            if(matrix[r][c] === 0)
            {
                emptySpots.push({r, c});
            }
        }
    }

    if(emptySpots.length > 0)
    {
        const spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
        const value = dict[Math.floor(Math.random() * dict.length)];
        matrix[spot.r][spot.c] = value;
    }
}

function printArray()
{
    const line = '-'.repeat(size * 8);
    console.log(line);
    for(let r = 0; r < size; r++)
    {
        let row = '|';
        for(let c=0; c < size; c++)
        {
            let val = 0;
            if(matrix[r][c] === 0)
            {
                val = " ";
            }
            else
            {
                val = matrix[r][c];
            }
            row += val.toString().padStart(5, ' ') + ' |';
        }
        console.log(row);
        console.log(line);
    }
}

game();