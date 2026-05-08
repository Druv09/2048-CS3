import * as readline from 'node:readline/promises'; //importing this to make input handling easier
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let matrix = []; //we're going to be storing our game in this
let dict = []; //this is where we store our probability for each number to to spawn
let finalNumber = 2048; //set this for now but change it for each difficulty
let gameEnd = true;
let roundEnd = false;
let difficulty = "";
let size = 0;

console.log("Welcome to 2048 by Druvan Bharath and Hemish Duri")

//here we set up the game, control the difficulty and stuff
async function game()
{
    difficulty = await rl.question("What difficulty? hard/med/easy "); //we have to use await and async for input

    matrix = [];
    dict = [];

    if(difficulty === "easy")
    {
        size = 5;
        finalNumber = 512;
        dict.push(2, 2, 2, 2, 4, 4, 4, 4, 4, 4);
    }
    else if(difficulty === "med")
    {
        size = 4;
        finalNumber = 1024;
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
        finalNumber = 32;
        dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
    }
    else if(difficulty === "help")
    {
        console.log("Easy: 6x6 board, 2s and 4s spawn, final number is 512");
        console.log("Med: 4x4 board, 2s and 4s spawn but 2s are more much likely, final number is 1024");
        console.log("Hard: 3x3 board, 2s only, final number is 2048");
        console.log("Test: testing purposes only");
        game();
    }
    else
    {
        console.log("Invalid input. Please type easy, med, or hard.");
        return game();
    }

    //fill in the game board with arrays filled with zeroes
    for(let r = 0; r < size; r++)
    {
        matrix.push(new Array(size).fill(0));
    }
    
    spawnNumber(); //start off with two numbers
    spawnNumber();
    play(); 
}

//to check if the player lost
function checkLoss()
{
    //if there are any empty spots
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

    //we also need to check if the player has any moves left
    //check if two numbers next to each other on a row equals each toher
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
    //check if two numbers on a column next to each other equals each other
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

    //if none of those conditions pass, it's gna be true and the game ends
    return true;
}


//this is where the player will be in most of the time
async function play()
{
    //loops through each time, prints out the array
    //if the player won or lost, we have to end the loop
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

        //grab the move that the user makes
        //we do that move and then spawn however many times per difficulty
        const moveInput = await rl.question("do w, a, s, d: ");
        if(processMove(moveInput))
        {
            if(difficulty === "hard")
            {
                spawnNumber();
                spawnNumber();
            }
            if(difficulty === "med")
            {
                spawnNumber();
            }
            if(difficulty === "easy")
            {
                spawnNumber();
            }
            if(difficulty === "test")
            {
                spawnNumber();
            }
        }
    }

    //loops again if the user wants to play again
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


//most important function, this figures out the move to make depending on userinput
//we have left, or a be the normal preprocessed move
//for each up down right, we have to rotate the matrix instead
//this lets work it out without making a new function for each move
function processMove(a)
{
    //moved lets us know if the user made a wasd move or messed up
    let moved = true;
    if(a === 'a')
    {
        move();
    }
    else if(a === 'w')
    {
        rotateMatrix();
        rotateMatrix(); 
        rotateMatrix(); 
        move();
        rotateMatrix();
    }
    else if(a === 'd')
    {
        rotateMatrix(); 
        rotateMatrix();
        move();
        rotateMatrix(); 
        rotateMatrix();
    }
    else if(a === 's')
    {
        rotateMatrix();
        move();
        rotateMatrix(); 
        rotateMatrix(); 
        rotateMatrix();
    }
    else
    {
        moved = false;
    }
    return moved;
}

//this is the move "left" function
function move()
{
    //every single cell we have to save if it is not empty
    //and then push it all to the end and add them together if they are next to each other and the same value
    //and then finally we add all the zeroes after
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
        let builder = [];
        for(let i = 0; i < row.length; i++)
        {
            if(row[i] === row[i + 1])
            {
                builder.push(row[i] * 2);
                i++; 
            }
            else
            {
                builder.push(row[i]);
            }
        }
        
        while(builder.length < size)
        {
            builder.push(0);
        }
        
        for(let c = 0; c < size; c++)
        {
            matrix[r][c] = builder[c];
        }
    }
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
            if(matrix[i][x] >= finalNumber)
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