const fs = require("fs/promises");

// Function to read and write files
const handleFile = async (fileName) => {
  const data = await fs.readFile(fileName, "utf-8");
  const content = JSON.parse(data);

  if (process.argv[2] === "--list") {
    console.table(content);
  } else {
    const name = process.argv[2];
    const age = process.argv[3];
    content.push({ name, age });

    await fs.writeFile(fileName, JSON.stringify(content, null, 2));
  }
};

handleFile("data.json");
