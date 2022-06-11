const path = require("path");
const { app, powerSaveBlocker, BrowserWindow, session } = require("electron");

app.commandLine.appendSwitch('enable-features', "SharedArrayBuffer")



app.commandLine.appendSwitch ("disable-http-cache");

const id = powerSaveBlocker.start('prevent-display-sleep')
//console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)

const isDev = process.env.IS_DEV == "true" ? true : false;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1"; // need to check someday...
app.commandLine.appendSwitch("disable-http-cache");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webSecurity: false,
      allowEval: true, // This is the key!
    },
  });


  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`,
    { extraHeaders: "pragma: no-cache\n" }
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    //require("electron").Menu.setApplicationMenu(null);
    mainWindow.webContents.openDevTools();
    webContents.reloadIgnoringCache();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
      ...details.responseHeaders,
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      }
    })
  })
  

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
