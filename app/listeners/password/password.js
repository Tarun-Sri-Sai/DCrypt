const crypto = require("crypto");
const { sessionData } = require("../../data");

module.exports = {
  storePassword: global.share.ipcMain.handle(
    "store-password",
    async (_, password) => {
      const hash = crypto.createHash("sha256");
      hash.update(password);
      const passwordHash = hash.digest("hex");

      sessionData.masterPasswordHash = passwordHash;
    }
  ),

  getPassword: global.share.ipcMain.handle("get-password", async (_) => {
    return sessionData.masterPasswordHash;
  }),
};
