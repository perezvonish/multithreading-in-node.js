import readline from "node:readline/promises";
import fs from "fs";
import Draw from "./draw.js";
import {BoxDesigns, BoxType, contentMessages, headerMessages, Positions} from "./types.js";
import {addTask, startWorkers} from "./launcher.js";
import {fileURLToPath} from "url";
import path from "path";

interface IInterpreter {
    init(): Promise<void>
    start(): void
    showFiles(): any
    showFile(): any
    executeFile(): any
}

export interface LauncherOptions {
    csharp?: number
    java?: number
    python?: number
    js?: number
}

export const workDir = "/files"

export default class Interpreter  {

    async init() {
        await startWorkers()
        Draw.clearConsole()
    }

    async start(): Promise<void> {
        const readLine: readline.Interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let header: string = Draw.createBox(headerMessages[Positions.greeting], BoxDesigns[BoxType.header])
        const content: string = Draw.createBox(contentMessages[Positions.greeting], BoxDesigns[BoxType.content])

        Draw.printBoxes(header, content)

        readLine.question('Your choice --> ').then((answer) => {
            const number: number = Number(answer)
            if (Object.values(Positions).includes(number)) {
                switch (number) {
                    case Positions.showFolder:
                        readLine.close()
                        Interpreter.showFiles()
                        break
                    default:
                        readLine.close()
                        this.start()
                        break
                }
            } else {
                readLine.close()
                this.start();
            }
        });
    }

    static showFiles() {
        Draw.clearConsole()

        const  readLine: readline.Interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename) + workDir;

        if (!fs.existsSync(__dirname)) {
            readLine.close()
            return Interpreter.prototype.start()
        }

        const files: string[] = fs.readdirSync(__dirname);
        const responseFiles = files.map((file) => {
            const elem = file.split(".")

            return {
                fileName: elem[0],
                extension: elem[1]
            }
        })

        const fileList: string = contentMessages[Positions.selectFile](responseFiles)

        let header: string = Draw.createBox(headerMessages[Positions.selectFile], BoxDesigns[BoxType.header])
        let content: string = Draw.createBox(fileList, BoxDesigns[BoxType.content])
        Draw.printBoxes(header, content)

        readLine.question('Your choice --> ').then((answer: string) => {
            const number: number = Number(answer)

            if (number >= 1 && number <= files.length) {
                addTask(
                    {
                        command: `${responseFiles[number - 1].extension}`,
                        filePath: `./src/files/${files[number - 1]}`
                    }
                )

                readLine.close()
            }
        });
    }
}
