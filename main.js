import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const matrix = [];
const dict = [];
let finalNumber = 0;
let gameEnd = false;
let roundEnd = false;
let difficulty = "";


rl.question("What difficulty? hard/med/easy ", type => {
    difficulty = type;
});

if(difficulty = "easy")
{
    matrix.push([], [], [], [], [], [], [], []);
    dict.push(2, 2, 2, 2, 4, 4, 4, 4, 4, 4);
}

if(difficulty = "med")
{
    matrix.push([], [], [], []);
    dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 4);
}

if(difficulty = "hard")
{
    matrix.push([], [], [], []);
    dict.push(2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
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