import { createServer } from "http"; 
import { readFile} from "fs/promises"

const PORT = 3000;
const server = createServer(async(res,req) =>{
    if(res.method === "GET"){
        if(req.url === "/"){
            try{
                const data = await readFile(path.join("public", "index.html"));
                res.writeHead(200,{"Content-Type" : "text/html"});
                res.end(data);
        } catch(err){
            res.writeHead(404,{"Content-Type" : "text/html"});
            res.end("<h1>Page Not Found</h1>");
        }
    }
}
})
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});