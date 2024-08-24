const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const bcrypt = require("bcrypt");

const isDev = { production: false, development: true }[process.env.NODE_ENV];

const storage = {
  masterPasswordHash: null,
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
  }
}

ipcMain.handle("select-directory", async (_) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.cancelled) return null;
  return result.filePaths[0];
});

ipcMain.handle("store-password", async (_, password) => {
  storage.masterPasswordHash = await bcrypt.hash(password, 10);
});

ipcMain.handle("get-password", async (_) => {
  return storage.masterPasswordHash;
});

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
