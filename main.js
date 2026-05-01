import readline from 'node:readline';
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

function builder(direction)
{
    const b = [];
    if(direction == "w" || direction == "W")
    {
        for(let y = 0; y < matrix.length; y++)
        {
            b.push(matrix[y][x]);
        }
    }
    if(direction == "a" || direction == "A")
    {
        for(let y = 0; y < matrix.length; y++)
        {
            b.push(matrix[x][y]);
        }
    }
    if(direction == "s" || direction == "S")
    {
        for(let y = 0; y < matrix.length; y++)
        {
            b.push(matrix[y][x]);
        }
    }
    if(direction == "d" || direction == "D")
    {
        for(let y = matrix.length - 1; y >= 0; y--)
        {
            b.push(matrix[x][y]);
        }
    }
    return b;
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


game();