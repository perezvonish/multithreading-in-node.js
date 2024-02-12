//@ts-ignore
import boxen, {Options} from "boxen";

class Draw {
    clearConsole() {
        console.log('\x1b[2J\x1b[0f')
    }

    createBox(text: string, options: any): string {
        return boxen( text, options );
    }

    printBoxes(header: string, content: string) {
        console.log(header)
        console.log(content)
    }
}

export default new Draw()
