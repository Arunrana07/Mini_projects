import { createServer } from "http";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { text } from "stream/consumers";

const PORT = 3000;

const serveFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(path.join("public", "style.css"));

        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);

    } catch (err) {
        console.log(err);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Page Not Found</h1>");
    }
}

const server = createServer(async (req, res) => {

    if (req.method === "GET") {

        if (req.url === "/") {
            return serveFile(res, path.join("public", "index.html", text / html));
        }
        else if (req.method === "GET") {
            if (req.url === "/style.css") {
                return serveFile(res, path.join("public", "style.css", text / css));
            }
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
