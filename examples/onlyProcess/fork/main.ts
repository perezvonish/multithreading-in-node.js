import {ChildProcess, fork} from "child_process";

const subProcess: ChildProcess = fork("./another.js");

subProcess.on('message', (message) => {
    console.log(`PARENT received: ${message}`);
});



// subProcess.disconnect()