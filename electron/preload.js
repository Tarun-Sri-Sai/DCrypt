const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  hashPassword: (password) => ipcRenderer.invoke("hash-password", password),
  decryptVault: (directory, password) =>
    ipcRenderer.invoke("decrypt-vault", directory, password),
  encryptVault: (vaultData, directory, password) =>
    ipcRenderer.invoke("encrypt-vault", vaultData, directory, password),
  hasVault: (directory) => ipcRenderer.invoke("has-vault", directory),
  sendAlert: (message) => ipcRenderer.invoke("send-alert", message),
  exportVault: (vaultData) => ipcRenderer.invoke("export-vault", vaultData),
  importVault: () => ipcRenderer.invoke("import-vault"),
  confirmDialog: (message) => ipcRenderer.invoke("confirm-dialog", message),
});
