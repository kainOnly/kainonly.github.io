const { app, BrowserWindow } = require('electron');
app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  win.loadURL('http://localhost:4200');
});
