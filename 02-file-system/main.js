const fs = require("fs").promises;

fs.readFile("readme.txt")
  .then((data) => console.log(data.toString()))
  .catch((err) => console.log(err.message));

// Common methods
// fs.readFile(filename, [options]) - чтение файла
// fs.writeFile(filename, data, [options]) - запись файла
// fs.appendFile(filename, data, [options])- добавление в файл
// fs.rename(oldPath, newPath) - переименование файла.
// fs.unlink(path, callback) - удаление файла.

// All methods
// console.log("fs", fs);
// fs {
//   access: [AsyncFunction: access],
//   copyFile: [AsyncFunction: copyFile],
//   open: [AsyncFunction: open],
//   opendir: [Function: opendir],
//   rename: [AsyncFunction: rename],
//   truncate: [AsyncFunction: truncate],
//   rm: [AsyncFunction: rm],
//   rmdir: [AsyncFunction: rmdir],
//   mkdir: [AsyncFunction: mkdir],
//   readdir: [AsyncFunction: readdir],
//   readlink: [AsyncFunction: readlink],
//   symlink: [AsyncFunction: symlink],
//   lstat: [AsyncFunction: lstat],
//   stat: [AsyncFunction: stat],
//   link: [AsyncFunction: link],
//   unlink: [AsyncFunction: unlink],
//   chmod: [AsyncFunction: chmod],
//   lchmod: [AsyncFunction: lchmod],
//   lchown: [AsyncFunction: lchown],
//   chown: [AsyncFunction: chown],
//   utimes: [AsyncFunction: utimes],
//   lutimes: [AsyncFunction: lutimes],
//   realpath: [AsyncFunction: realpath],
//   mkdtemp: [AsyncFunction: mkdtemp],
//   writeFile: [AsyncFunction: writeFile],
//   appendFile: [AsyncFunction: appendFile],
//   readFile: [AsyncFunction: readFile]
// }
