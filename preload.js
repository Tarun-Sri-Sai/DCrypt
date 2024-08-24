const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  storePassword: (password) => ipcRenderer.invoke("store-password", password),
  getPassword: () => ipcRenderer.invoke("get-password"),
});
