const { exec } = require('child_process');

// Run client
const client = exec('npm start', { cwd: './client' });
client.stdout.pipe(process.stdout);
client.stderr.pipe(process.stderr);

// Run server
const server = exec('npm start', { cwd: './server' });
server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);

// Run socket
const socket = exec('npm start', { cwd: './socket' });
socket.stdout.pipe(process.stdout);
socket.stderr.pipe(process.stderr);
