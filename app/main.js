const { app, BrowserWindow, ipcMain } = require("electron");
const {
  INDEX_HTML,
  DEFAULT_DIMS,
  PRELOAD_PATH,
  REACT_DEV_URL,
  IS_DEV,
} = require("./utils/constants");

global.share = { ipcMain };

require("./listeners/directory/index");
require("./listeners/password/index");
require("./listeners/vault/index");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    ...DEFAULT_DIMS,
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (IS_DEV) {
    mainWindow.loadURL(REACT_DEV_URL);
  } else {
    mainWindow.loadFile(INDEX_HTML);
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
