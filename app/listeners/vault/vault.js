const path = require("path");
const fs = require("fs");
const { VAULT_FILE } = require("../../utils/constants");
const { sessionData } = require("../../data");
const { encryptData, decryptData } = require("../../utils/vault");

module.exports = {
  checkVault: global.share.ipcMain.handle(
    "check-vault",
    async (_, directory) => {
      const filePath = path.join(directory, VAULT_FILE);
      return fs.existsSync(filePath);
    }
  ),

  decryptVault: global.share.ipcMain.handle(
    "decrypt-vault",
    async (_, directory) => {
      try {
        const filePath = path.join(directory, VAULT_FILE);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(
          decryptData(fileData, sessionData.masterPasswordHash)
        );
      } catch (err) {
        return null;
      }
    }
  ),

  encryptVault: global.share.ipcMain.handle(
    "encrypt-vault",
    async (_, directory, vaultData) => {
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
    }
  ),
};
