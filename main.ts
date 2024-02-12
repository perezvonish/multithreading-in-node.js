//@ts-ignore
import boxen, {Options} from "boxen";
import Interpreter from "./src/interpreter.js";

async function main() {
    const interpreter: Interpreter = new Interpreter()

    interpreter.init().then(() => {
        interpreter.start()
    })
}

main()
