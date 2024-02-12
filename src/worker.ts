import {execFile} from "child_process";
import {parentPort} from "worker_threads";

export function execute(command: string, filePath: string) {
    execFile(command, [filePath],  (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        }

        if (stderr) {
            console.log("error")
        }

        if (stdout) {
            const data = {
                filePath,
                result: stdout
            }

            parentPort?.postMessage(data)
        }
    })
}

parentPort?.on('message', (data: {command: string, filePath: string}) => {
    console.log(true)
    execute(data.command, data.filePath)
});
