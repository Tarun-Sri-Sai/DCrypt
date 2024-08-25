const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const { decryptData, encryptData } = require("./vaultUtils");

const IS_DEV = { production: false, development: true }[process.env.NODE_ENV];
const VAULT_FILE = ".dcryptvault";

const sessionData = {
  masterPasswordHash: null,
  attemptedCloseOnce: false,
};

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (IS_DEV) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
  }

  mainWindow.on("close", (e) => {
    if (!sessionData.attemptedCloseOnce) {
      e.preventDefault();
      sessionData.attemptedCloseOnce = true;

      mainWindow.webContents.send("request-encryption");
      mainWindow.close();
    }
  });
};

ipcMain.handle("select-directory", async (_) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled) {
    return null;
  }
  return result.filePaths[0];
});

ipcMain.handle("store-password", async (_, password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  const passwordHash = hash.digest("hex");

  sessionData.masterPasswordHash = passwordHash;
});

ipcMain.handle("get-password", async (_) => {
  return sessionData.masterPasswordHash;
});

ipcMain.handle("check-vault", async (_, directory) => {
  const filePath = path.join(directory, VAULT_FILE);
  return fs.existsSync(filePath);
});

ipcMain.handle("decrypt-vault", async (_, directory) => {
  try {
    const filePath = path.join(directory, VAULT_FILE);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(decryptData(fileData, sessionData.masterPasswordHash));
  } catch (err) {
    return null;
  }
});

ipcMain.handle("encrypt-vault", async (_, directory, vaultData) => {
  try {
    const fileData = encryptData(
      JSON.stringify(vaultData),
      sessionData.masterPasswordHash
    );
    const filePath = path.join(directory, VAULT_FILE);
    fs.writeFileSync(filePath, fileData);
  } catch (err) {
    throw new Error(`Error while encrypting vault: ${err}`);
  }
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

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!mainWindow) {
      return;
    }
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  });
}
