const path = require("path");

// Path resolve
console.log(path.resolve("/foo/bar", "./baz"));
// Returns: '/foo/bar/baz'

console.log(path.resolve("/foo/bar", "/tmp/file/"));
// Returns: '/tmp/file'

console.log(path.resolve("wwwroot", "static_files/png/", "../gif/image.gif"));
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'

// Path join
console.log(path.join("/foo", "bar", "baz/asdf", "quux", ".."));
// Returns: '/foo/bar/baz/asdf'

console.log(path.join(__dirname, "/foo", "bar", "baz/asdf", "quux", ".."));
// Returns: C:\Users\theca\Documents\GitHub\goit-practice-nodejs\03-os-path\foo\bar\baz\asdf

console.log("__dirname", __dirname);
console.log("__filename", __filename);
console.log('Hello from FS');