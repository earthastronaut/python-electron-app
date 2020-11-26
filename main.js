const {app, BrowserWindow} = require('electron');
const {spawn} = require('child_process');

// todo: must be a better way! without using a global variable.
var mainpy;

function initializePythonProcess() {
  const mainpy = spawn('python3', ['main.py']);

  mainpy.stdout.on('data', (data) => {
    console.log(`mainpy: info: ${data}`);
  })

  mainpy.stderr.on('data', (data) => {
    console.log(`mainpy: error: ${data}`)
  })

  mainpy.on('close', (code) => {
    console.log(`mainpy exited with code ${code}`);
  });

  return mainpy
}

function createWindow () {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadFile('index.html');

  mainpy = initializePythonProcess();
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('quit', () => {
  if (mainpy) {mainpy.kill(2)};
})