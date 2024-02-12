<br />
<div align="center">
<h3 align="center">Multithreading in Node.js</h3>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This repository can be your answer in Node.js multithreading. Lets 

Some theory:
* `Cluster` is a complete copy of an application. Has a balancer out of the box. Effective for building a microservice structure.
* `Worker thread` is a secondary thread that runs alongside its parent, using an event emitter to communicate with it, allowing the application to be optimized through synchronization and concurrency.
* `Child Processes` are a completely isolated flow of information that can communicate with the main parent. It has several varieties for a specific task:
  * `Exec` - launch the internal environment of the computer (can be reproduced via the console - do it via `exec`)
  * `ExecFile` - launching another file through the internal environment of the computer (if you want to call google chrome for a specific document, do it through `execFile`)
  * `Spawn` - reproduction of any command with obtaining several stages of “passing” the completed work. (If you want to make a loader for your game with a display of the status of what is happening under the box, do it through `spawn`)
  * `Fork` - starts a child thread with constant communication between them via an event emmiter. (If you want to constantly have control over what is happening inside the child process, and also engage in dynamic raising of channels, use `fork`)

<!-- GETTING STARTED -->
## Getting Started

You can check all examples in `examples` folder. They are separated on several directories, which will functional showcase.
<br />

For example - for `cluster` we can check loading via simple `node:http` and `cluster`. 
Anyway you can do it with any framework - express, nest.js, koa and etc.

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Put ``files`` folder inside `dist/src` directory

3. Run any compiled `*.js` file for your choice or check `main project` for demonstration.

<!-- Helpful links -->
## Helpful links

1. Node.js documentation: [Cluster](https://nodejs.org/api/cluster.html#cluster)
2. Node.js documentation: [Worker threads](https://nodejs.org/api/worker_threads.html#new-workerfilename-options)
3. Node.js documentation: [Child process](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options)

<!-- CONTACT -->
## Contact

Vladimir - [telegram --> @perezvonishh](https://t.me/perezvonishh)

