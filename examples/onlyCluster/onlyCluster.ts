import cluster from "cluster";
import * as http from "http";
import {availableParallelism} from "os";
import {exec} from "child_process";
import startHeavyPushing from "./startImitationOfHeavyRequests";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    //start imitation of heavy requests
    startHeavyPushing()
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}