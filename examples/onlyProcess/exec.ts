import {exec} from "child_process"

exec('echo "The \\$HOME variable is $HOME"', (error, stdout, stderr) => {
    if (stdout) {
        console.log(stdout)
    }
});