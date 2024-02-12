import {exec} from "child_process";

export default function startHeavyPushing() {
    exec('loadtest -c 10 --rps 100 -n 1000 http://localhost:3000', (error, stdout, stderr) => {
        if (stdout) {
            console.log(stdout)
        }
    });
}