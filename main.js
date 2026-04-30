import readline from 'node:readline';
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const matrix = [];
const dict = [];
let finalNumber = 0;
let gameEnd = true;
let roundEnd = false;
let difficulty = "";


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