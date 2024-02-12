import {isMainThread, Worker} from "worker_threads";

if (isMainThread) {
    const worker = new Worker("./worker.js")

    worker.postMessage("message")

    worker.on("message", () => {
        console.log("MainThread: Eeee, catch message from my thread! Goodbye!")
    })
}