const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const path = require("path");
const querystring = require("querystring");

const TypeMime = {
  ".html": "text/html",
  ".htm": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".ico": "image/x-icon",
};

http
  .createServer(async (req, res) => {
    const newUrl = url.parse(req.url);
    const pathname = newUrl.pathname;
    let filename = pathname.substring(1);

    switch (pathname) {
      case "/":
        filename = "index.html";
        break;
      case "/about":
        filename = "about.html";
        break;
      case "/contacts":
        filename = "contacts.html";
        break;

      default:
        break;
    }

    if (pathname === "/contacts" && req.method === "POST") {
      const body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", async () => {
        const parsedBody = decodeURIComponent(Buffer.concat(body).toString());
        console.log("parsedBody", parsedBody);
        const result = querystring.parse(parsedBody);
        console.log(result);
        const dbJSON = await fs.readFile("form-data.json");
        const dbParsed = JSON.parse(dbJSON);
        dbParsed.push(result);
        await fs.writeFile("form-data.json", JSON.stringify(dbParsed, null, 2));
      });
      res.statusCode = 302;
      res.setHeader("Location", "/contacts");

      return res.end();
    }

    const type = TypeMime[path.extname(filename)];

    if (type && type.includes("image")) {
      try {
        const img = await fs.readFile(filename);
        res.writeHead(200, { "Content-Type": type });
        res.write(img, "hex");
        res.end();
      } catch (error) {
        console.log("Error in image handler", error.message);
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end();
      }
    } else {
      try {
        const content = await fs.readFile(filename, "utf-8");
        res.writeHead(200, { "Content-Type": type });
        res.write(content);
        res.end();
      } catch (error) {
        console.log("Error in content handler", error.message);
        if (!type || type === "text/html") {
          const content = await fs.readFile("404.html", "utf-8");
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(content);
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
        }
        res.end();
      }
    }
  })
  .listen(3000, () => {
    console.log("Server listens on port 3000");
  });
