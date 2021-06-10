const app = require('../app');
const db = require('../model/db');
const createFolderIfNotExist = require('../helpers/create-folder');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const AVATAR_DIR = process.env.AVATAR_DIR;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIfNotExist(UPLOAD_DIR);
    await createFolderIfNotExist(AVATAR_DIR);

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(error => {
  console.log(`Error: ${error.message}`);
});
