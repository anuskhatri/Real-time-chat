const { exec } = require('child_process');

// Install client dependencies
const clientInstall = exec('npm install', { cwd: './client' });
clientInstall.stdout.pipe(process.stdout);
clientInstall.stderr.pipe(process.stderr);

// Install server dependencies
const serverInstall = exec('npm install', { cwd: './server' });
serverInstall.stdout.pipe(process.stdout);
serverInstall.stderr.pipe(process.stderr);

// Install socket dependencies
const socketInstall = exec('npm install', { cwd: './socket' });
socketInstall.stdout.pipe(process.stdout);
socketInstall.stderr.pipe(process.stderr);
