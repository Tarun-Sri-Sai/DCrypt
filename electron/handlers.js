const { dialog } = require("electron");
const { Vault } = require("./vault");

module.exports = {
  selectDirectory: global.share.ipcMain.handle("select-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (result.canceled) {
      throw new Error("Operation canceled");
    }

    return result.filePaths[0];
  }),

  setPassword: global.share.ipcMain.handle(
    "set-password",
    async (_, directory, password) => {
      global.share.ipcMain.vault = Vault(directory, password);
    },
  ),

  writeVault: global.share.ipcMain.handle(
    "write-vault",
    async (_, directory, pathArray, key, value) =>
      global.share.vault.write(directory, pathArray, key, value),
  ),

  readVault: global.share.ipcMain.handle("read-vault", async (_, pathArray) =>
    global.share.vault.read(pathArray),
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
};
