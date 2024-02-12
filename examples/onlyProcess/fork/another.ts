process.on('message', (m) => {
    console.log('CHILD received:', m);
});

setTimeout(() => {
    //@ts-ignore
    process.send("BYE, parent!")
})