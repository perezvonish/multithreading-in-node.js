import {execFile} from "child_process"

execFile('node', ["./runMe.js"], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});