const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  selectDirectory: () => {
    return ipcRenderer.invoke("select-directory");
  },

  storePassword: (password) => {
    return ipcRenderer.invoke("store-password", password);
  },

  getPassword: () => {
    return ipcRenderer.invoke("get-password");
  },

  decryptVault: (directory) => {
    return ipcRenderer.invoke("decrypt-vault", directory);
  },

  encryptVault: (directory, vaultData) => {
    return ipcRenderer.invoke("encrypt-vault", directory, vaultData);
  },

  onRequestEncryption: (callback) => {
    return ipcRenderer.on("request-encryption", (_) => callback());
  },

  checkVault: (directory) => {
    return ipcRenderer.invoke("check-vault", directory);
  },
});
