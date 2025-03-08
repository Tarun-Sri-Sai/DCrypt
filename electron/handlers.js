const { dialog } = require("electron");
const { Vault } = require("./vault");
const { UserCanceledError } = require("./utils/errors");

module.exports = {
  selectDirectory: global.share.ipcMain.handle("select-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (result.canceled) {
      throw new UserCanceledError("Operation canceled");
    }

    return result.filePaths[0];
  }),

  initVault: global.share.ipcMain.handle(
    "init-vault",
    async (_, directory, password) => {
      global.share.ipcMain.vault = Vault(directory, password);
    },
  ),

  writeVault: global.share.ipcMain.handle(
    "write-vault",
    async (_, pathArray, contents) =>
      global.share.vault.write(pathArray, contents),
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

      if (result.canceled) {
        throw new UserCanceledError("Operation canceled");
      }

      return result.response === 0;
    },
  ),
};
