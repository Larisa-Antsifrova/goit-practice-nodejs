const fs = require("fs/promises");

const file = "../03-os-path/path.js";

// Function to check if the file exists
const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

// Function to read and write files
const handleFile = async (fileName, newFile, directory) => {
  const file = await fs.readFile(fileName, "utf-8");

  const exists = await isAccessible(directory);

  if (!exists) {
    await fs.mkdir(directory);
  }

  await fs.writeFile(`./${directory}/${newFile}.js`, `${file}console.log('Hello from FS');`);
};

handleFile(file, "temp", "temp");
