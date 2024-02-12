import http from "http";
import startHeavyPushing from "./startImitationOfHeavyRequests";

http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(3001);

startHeavyPushing()