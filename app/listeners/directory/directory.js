const { dialog } = require("electron");

module.exports = {
  selectDirectory: global.share.ipcMain.handle(
    "select-directory",
    async (_) => {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (result.canceled) {
        return null;
      }
      return result.filePaths[0];
    }
  ),
};
