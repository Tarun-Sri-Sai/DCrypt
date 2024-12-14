const { dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const { EXPORT_FILE_PREFIX } = require("./constants");
const { getCurrentTime } = require("./utils/datetime");
const { formatPath } = require("./utils/files");

module.exports = {
  selectDirectory: global.share.ipcMain.handle("select-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    return result.canceled ? null : result.filePaths[0];
  }),

  hasVaultFile: global.share.ipcMain.handle(
    "has-vault-file",
    async (_, directory) => global.share.vault.hasVaultFile(directory),
  ),

  usePassword: global.share.ipcMain.handle(
    "use-password",
    async (_, directory, password) =>
      global.share.vault.setPassword(password) &&
      global.share.vault.unlock(directory),
  ),

  importVault: global.share.ipcMain.handle(
    "import-vault",
    async (_, directory) => {
      const result = await dialog.showOpenDialog({
        filters: [{ name: "JSON Files", extensions: ["json"] }],
        properties: ["openFile"],
      });

      if (result.canceled) {
        return false;
      }

      const fileData = JSON.parse(fs.readFileSync(result.filePaths[0]));
      return global.share.vault.set(directory, fileData);
    },
  ),

  exportVault: global.share.ipcMain.handle("export-vault", async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (result.canceled) {
        return null;
      }

      const exportFile = path.join(
        result.filePaths[0],
        `${EXPORT_FILE_PREFIX}_${getCurrentTime()}.json`,
      );
      const vaultData = global.share.vault.getContents([]);

      fs.writeFileSync(exportFile, JSON.stringify(vaultData));
      return formatPath(result.filePaths[0]);
    } catch {
      return null;
    }
  }),

  setVaultContents: global.share.ipcMain.handle(
    "set-contents",
    async (_, directory, pathArray, key, value) =>
      global.share.vault.setContents(directory, pathArray, key, value),
  ),

  getVaultContents: global.share.ipcMain.handle(
    "get-contents",
    async (_, pathArray) => global.share.vault.getContents(pathArray),
  ),

  sendAlert: global.share.ipcMain.handle("send-alert", async (_, message) => {
    dialog.showErrorBox("Alert", message);
  }),

  sendInfo: global.share.ipcMain.handle("send-info", async (_, message) => {
    const options = {
      type: "info",
      title: "Info",
      message,
    };

    dialog.showMessageBox(global.share.mainWindow, options);
  }),

  sendConfirm: global.share.ipcMain.handle(
    "send-confirm",
    async (_, message) => {
      const options = {
        type: "question",
        buttons: ["Yes", "No"],
        title: "Confirm",
        message,
      };

      const result = await dialog.showMessageBox(
        global.share.mainWindow,
        options,
      );

      return !result.canceled && result.response === 0;
    },
  ),

  reloadPage: global.share.ipcMain.handle("reload-page", () => {
    if (global.share.mainWindow) global.share.mainWindow.reload();
  }),
};
