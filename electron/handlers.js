const { dialog } = require("electron");
const path = require("path");
const { VAULT_FILE } = require("./constants");
const { decryptData, encryptData } = require("./utils");
const fs = require("fs");
const crypto = require("crypto");

module.exports = {
  selectDirectory: global.share.ipcMain.handle(
    "select-directory",
    async (_) => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ["openDirectory"],
        });

        if (result.canceled) {
          return [null, "Operation canceled"];
        }
        return [result.filePaths[0], null];
      } catch (err) {
        return [null, `Error while selecting directory: ${err}`];
      }
    }
  ),

  hashPassword: global.share.ipcMain.handle(
    "hash-password",
    async (_, password) => {
      try {
        if (!password) {
          return [null, "'password' argument is empty"];
        }

        const hash = crypto.createHash("sha256");
        hash.update(password);
        const hashedPassword = hash.digest("hex");

        return [hashedPassword, null];
      } catch (err) {
        return [null, `Error while hashing password: ${err}`];
      }
    }
  ),

  decryptVault: global.share.ipcMain.handle(
    "decrypt-vault",
    async (_, directory, password) => {
      try {
        if (!directory) {
          return [null, "'directory' argument is empty"];
        }

        if (!password) {
          return [null, "'password' argument is empty"];
        }

        const filePath = path.join(directory, VAULT_FILE);
        const fileData = fs.readFileSync(filePath, "utf8");

        const decryptedData = JSON.parse(decryptData(fileData, password));
        return [decryptedData, null];
      } catch (err) {
        return [null, `Error while decrypting vault: ${err}`];
      }
    }
  ),

  encryptVault: global.share.ipcMain.handle(
    "encrypt-vault",
    async (_, vaultData, directory, password) => {
      try {
        if (!directory) {
          return [null, "'directory' argument is empty"];
        }

        if (!password) {
          return [null, "'password' argument is empty"];
        }

        const fileData = encryptData(JSON.stringify(vaultData), password);

        const filePath = path.join(directory, VAULT_FILE);
        fs.writeFileSync(filePath, fileData);

        return [true, null];
      } catch (err) {
        return [false, `Error while encrypting vault: ${err}`];
      }
    }
  ),

  hasVault: global.share.ipcMain.handle("has-vault", async (_, directory) => {
    try {
      if (!directory) {
        return [null, "'directory' argument is empty"];
      }

      const filePath = path.join(directory, VAULT_FILE);
      const fileExists = fs.existsSync(filePath);

      return [fileExists, null];
    } catch (err) {
      return [null, `Error while checking for vault: ${err}`];
    }
  }),

  sendAlert: global.share.ipcMain.handle("send-alert", (_, message) => {
    const options = {
      type: "none",
      buttons: ["Okay"],
      title: "Alert!",
      message,
    };
    dialog.showMessageBox(global.share.mainWindow, options);
  }),

  exportVault: global.share.ipcMain.handle(
    "export-vault",
    (_, vaultData) => {
      
    }
  ),
};
