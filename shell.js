const { exec } = require("child_process");
const events = require('./events');


function handleShellSocket(socket) {
    socket.on(events.SHELL.SEND(), (command) => {
        exec(command, (error, output, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            socket.emit(events.SHELL.OUTPUT(), {
                command, output
            })
        });
    });
};


module.exports = {
    handleShellSocket
}
