import {parentPort} from "worker_threads";

function startWork() {
    console.log("Wooow, I - Worker.")
    console.log("Lets wait 3s....")

    setTimeout(() => {
        waited()
    }, 3000)
}

function waited() {
    console.log("Ohh, lets send message to parentPort :)")

    parentPort?.postMessage("message")
}

parentPort?.on("message", () => {
    startWork()
})