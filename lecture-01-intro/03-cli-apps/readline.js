const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin, // ввод из стандартного потока
  output: process.stdout, // вывод в стандартный поток
});

rl.on("line", (cmd) => {
  console.log(`You just typed: ${cmd}`);
});

rl.question("Как вас зовут?", (answer) => {
  console.log(`Приятно познакомиться ${answer}`);
});

// rl.pause();
// rl.close();
