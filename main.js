const {
  DEFAULT_DIMS,
  PRELOAD_PATH,
  IS_DEV,
  REACT_DEV_URL,
  REACT_INDEX_PATH,
} = require("./electron/constants.js");
const { app, BrowserWindow, ipcMain } = require("electron");
const { Vault } = require("./electron/vault.js");

global.share = { ipcMain, mainWindow: null, vault: new Vault() };

require("./electron/handlers.js");

const createWindow = () => {
  global.share.mainWindow = new BrowserWindow({
    ...DEFAULT_DIMS,
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
      devTools: IS_DEV,
    },
  });

  if (IS_DEV) {
    global.share.mainWindow.loadURL(REACT_DEV_URL);
  } else {
    global.share.mainWindow.loadFile(REACT_INDEX_PATH);
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
