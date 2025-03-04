const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  selectDirectory: (...args) => ipcRenderer.invoke("select-directory", ...args),
  hasVaultFile: (...args) => ipcRenderer.invoke("has-vault-file", ...args),
  usePassword: (...args) => ipcRenderer.invoke("use-password", ...args),
  importVault: (...args) => ipcRenderer.invoke("import-vault", ...args),
  exportVault: (...args) => ipcRenderer.invoke("export-vault", ...args),
  setVaultContents: (...args) => ipcRenderer.invoke("set-contents", ...args),
  getVaultContents: (...args) => ipcRenderer.invoke("get-contents", ...args),
  sendAlert: (...args) => ipcRenderer.invoke("send-alert", ...args),
  sendInfo: (...args) => ipcRenderer.invoke("send-info", ...args),
  sendConfirm: (...args) => ipcRenderer.invoke("send-confirm", ...args),
});
