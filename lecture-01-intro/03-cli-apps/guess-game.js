const readline = require("readline");
const fs = require("fs").promises;
const { program } = require("commander");
require("colors");

program.option("-f, --file [type]", "file for saving game results", "results.txt");
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Enter a number!".red);
    return false;
  }

  if (value < 1 || value > 10) {
    console.log("The number should be between 1 and 10 inclusively".red);
    return false;
  }

  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`The result was saved in ${logFile}`.green);
  } catch (err) {
    console.log(`The result was not saved in ${logFile}`.red);
  }
};

const game = () => {
  rl.question("Enter a number from 1 to 10 to guess: ".yellow, (value) => {
    let a = +value;

    if (!isValid(a)) {
      game();
      return;
    }

    count += 1;

    if (a === mind) {
      console.log(`Congrats, you have guessed the number in ${count} ${count > 1 ? "steps" : "step"}`.green);

      log(
        `${new Date().toLocaleDateString()}: Congrats, you have guessed the number in ${count} ${
          count > 1 ? "steps" : "step"
        }`
      ).finally(() => rl.close());
      return;
    }

    console.log("You have missed. Try again".red);
    game();
  });
};

game();
