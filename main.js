import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const matrix = [];
const dict = [];
let finalNumber = 0;
let gameEnd;


rl.question(`What difficulty? hard/med/easy`, type => {
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

while()
{
    
}