import { createServer } from "http";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const PORT = 3000;
const DATA_FILE = path.join("data", "links.json");

const serveFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, {
            "Content-Type": contentType,
        });

        res.end(data);
    } catch (error) {
        console.error(error);

        res.writeHead(404, {
            "Content-Type": "text/html",
        });

        res.end("<h1>Page Not Found</h1>");
    }
};

const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(DATA_FILE, JSON.stringify({}), "utf-8");
            return {};
        }

        throw error;
    }
};

const saveLinks = async (links) => {
    await writeFile(
        DATA_FILE,
        JSON.stringify(links, null, 2),
        "utf-8"
    );
};

const server = createServer(async (req, res) => {
    // Home Page
    if (req.method === "GET" && req.url === "/") {
        return serveFile(
            res,
            path.join("public", "index.html"),
            "text/html"
        );
    }

    // CSS
    if (req.method === "GET" && req.url === "/style.css") {
        return serveFile(
            res,
            path.join("public", "style.css"),
            "text/css"
        );
    }

    // Create Short URL
    if (req.method === "POST" && req.url === "/shorten") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                console.log("BODY:", body);

                const { url, shortCode } = JSON.parse(body);

                console.log("URL:", url);
                console.log("SHORTCODE:", shortCode);


                if (!url) {
                    res.writeHead(400, {
                        "Content-Type": "text/plain",
                    });

                    return res.end("URL is required");
                }

                const links = await loadLinks();

                const finalShortCode =
                    shortCode?.trim() ||
                    crypto.randomBytes(4).toString("hex");

                if (links[finalShortCode]) {
                    res.writeHead(400, {
                        "Content-Type": "text/plain",
                    });

                    return res.end(
                        "Short code already exists. Please choose another."
                    );
                }

                links[finalShortCode] = url;

                await saveLinks(links);

                res.writeHead(200, {
                    "Content-Type": "application/json",
                });

                res.end(
                    JSON.stringify({
                        success: true,
                        shortCode: finalShortCode,
                        shortUrl: `http://localhost:${PORT}/${finalShortCode}`,
                    })
                );
            } catch (error) {
                console.error(error);

                res.writeHead(500, {
                    "Content-Type": "text/plain",
                });

                res.end("Internal Server Error");
            }
        });

        return;
    }

    // Redirect Route
    if (req.method === "GET") {
        const links = await loadLinks();

        const shortCode = req.url.slice(1);

        if (links[shortCode]) {
            res.writeHead(302, {
                Location: links[shortCode],
            });

            return res.end();
        }
    }

    // 404
    res.writeHead(404, {
        "Content-Type": "text/plain",
    });

    res.end("Route Not Found");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});