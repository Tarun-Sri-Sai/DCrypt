const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  selectDirectory: (...args) => ipcRenderer.invoke("select-directory", ...args),
  initVault: (...args) => ipcRenderer.invoke("init-vault", ...args),
  writeVault: (...args) => ipcRenderer.invoke("write-vault", ...args),
  readVault: (...args) => ipcRenderer.invoke("read-vault", ...args),
  sendAlert: (...args) => ipcRenderer.invoke("send-alert", ...args),
  sendInfo: (...args) => ipcRenderer.invoke("send-info", ...args),
  sendConfirm: (...args) => ipcRenderer.invoke("send-confirm", ...args),
});
