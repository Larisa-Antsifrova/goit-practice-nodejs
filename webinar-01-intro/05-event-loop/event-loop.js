// Require imports are synchronous
const fs = require("fs");

console.log("Beginning");

setTimeout(() => {
  console.log("setTimeout happened");
}, 0);

setImmediate(() => {
  console.log("setImmediate happened");
});

new Promise((resolve) => {
  resolve("Promise happened");
  process.nextTick(() => {
    console.log("nextTick before");
  });
}).then(console.log);

Promise.resolve().then(() => console.log("promise 1 happened"));
Promise.resolve().then(() => {
  console.log("promise 2 happened");
  process.nextTick(() => {
    console.log("nextTick in promise happened");
  });
});
Promise.resolve().then(() => console.log("promise 3 happened"));

queueMicrotask(() => {
  console.log("queueMicrotask happened");
});

process.nextTick(() => {
  console.log("nextTick 1 happened");
});
process.nextTick(() => {
  console.log("nextTick 2 happened");
});
process.nextTick(() => {
  console.log("nextTick 3 happened");
});

new Promise((resolve) => {
  resolve("Promise happened");
  process.nextTick(() => {
    console.log("nextTick after");
  });
}).then(console.log);

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});

console.log("End");

// Result
// $ node event-loop.js
// Beginning
// End
// nextTick before
// nextTick 1 happened
// nextTick 2 happened
// nextTick 3 happened
// nextTick after
// Promise happened
// promise 1 happened
// promise 2 happened
// promise 3 happened
// queueMicrotask happened
// Promise happened
// nextTick in promise happened
// setTimeout happened
// setImmediate happened
// immediate
// timeout
