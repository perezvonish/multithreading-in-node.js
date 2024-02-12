import {isMainThread, Worker} from "worker_threads";
import {fileURLToPath} from "url";
import {BoxDesigns, BoxType, contentMessages, headerMessages, LanguageInfo, Positions} from "./types.js";
import path from "path";
import Draw from "./draw.js";
import Interpreter, {workDir} from "./interpreter.js";


let javaScriptWorker: Worker | undefined
let  pythonWorker: Worker | undefined

const tasks: {command: string, filePath: string}[] = []
let currentTask: number = 0;

export async function startWorkers() {
    if (isMainThread) {
        // @ts-ignore
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename)

        javaScriptWorker = new Worker( __dirname + '/worker.js', { workerData: { command: LanguageInfo.js.command } })
        javaScriptWorker.on("message", (data) => {
            showResult(data)
        })

        pythonWorker = new Worker( __dirname + '/worker.js', { workerData: { command: LanguageInfo.py.command } })
        pythonWorker.on('message', (data) => {
            showResult(data)
        });
    }
}

function showResult(data: any) {
    let header: string = Draw.createBox(
        headerMessages[Positions.executeFile](data.filePath),
        BoxDesigns[BoxType.header]
    )
    const content: string = Draw.createBox(
        contentMessages[Positions.executeFile](String(data.result)),
        BoxDesigns[BoxType.content]
    )

    Draw.printBoxes(header, content)
    setTimeout(() => {
        Draw.clearConsole()
        Interpreter.prototype.start()
    }, 3000)
}

export function addTask(task: {command: string, filePath: string}): void {
    tasks.push(task)

    assignTaskToWorker()
}

function assignTaskToWorker() {
    const task = tasks[currentTask++];


    switch (String(task.command)) {
        case LanguageInfo.js.identifier:
            javaScriptWorker?.postMessage({command: LanguageInfo.js.command, filePath: task.filePath});
            break
        case LanguageInfo.py.identifier:
            pythonWorker?.postMessage({command: LanguageInfo.py.command, filePath: task.filePath});
            break
        default:
            break
    }
}
