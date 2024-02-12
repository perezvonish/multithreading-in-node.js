//@ts-ignore
import chalk from "chalk";

export enum Positions {
    greeting = 0,
    showFolder,
    selectFile,
    showFile,
    executeFile
}

export enum BoxType {
    header,
    content
}

export const BoxDesigns = {
    [BoxType.header]: { borderStyle: "bold", borderColor: "red", width: 64, float: "center", title: "Multi Language", textAlignment: "center" },
    [BoxType.content]: { padding: 1, borderStyle: "bold", borderColor: "red", width: 64, float: "center" }
}

export const LanguageInfo = {
    js: {
        identifier: "js",
        title: "Java Script",
        command: "node"
    },
    py: {
        identifier: "py",
        title: "Python",
        command: "python3"
    },
    cs: {
        identifier: "cs",
        title: "C#",
        command: "dotenv"
    },
    java: {
        identifier: "java",
        title: "Java",
        command: "java"
    }
}

export const headerMessages = {
    [Positions.greeting]:  chalk.green(`Greetings stranger!\nEnter one of the commands!`),
    [Positions.selectFile]: chalk.green(`Select one of the files`),
    [Positions.executeFile]: (fileName: string) => {
        return chalk.green(`Result of file ${fileName}`)
    }
}

export const contentMessages = {
    [Positions.greeting]:  chalk.red.bold("\n1. ") + chalk.whiteBright.bold("Show folder files"),
    [Positions.selectFile]: (files: {
        fileName: string,
        extension: string
    }[]) => {
        let message = ''

        for (let i = 0; i < files.length; i++){
            message += chalk.red.bold(`${i+1}. `) +
                //@ts-ignore
                chalk.red.bgGray(`${LanguageInfo[`${files[i].extension}`].title}`) +
                chalk.green.bold(` ${files[i].fileName}\n`)
        }

        return message
    },
    [Positions.executeFile]: (result: string) => {
        return chalk.green(result)
    }
}
