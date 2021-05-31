console.log("process.argv", process.argv);

console.log("__dirname", __dirname); // Where the scrip is located
console.log("process.cwd()", process.cwd()); // Where the script was launched

process.on("exit", (code) => {
  console.log(code);
});

process.exit(); // No errors
process.exit(1); // With errors
