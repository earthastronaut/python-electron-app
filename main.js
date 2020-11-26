const {app, BrowserWindow} = require('electron')
const pyshell = require('python-shell');

function createWindow () {
    window = new BrowserWindow({width: 800, height: 600})
    window.loadFile('index.html')

pyshell.run(
  'main.py',
  (err, results) => {
    if (err) throw err;
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})
