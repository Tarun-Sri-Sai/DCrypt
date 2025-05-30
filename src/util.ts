import * as vscode from "vscode";
import os from "os";
import path from "path";

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getPasswordKey(uri: vscode.Uri) {
  let key;
  if (
    vscode.workspace
      .getConfiguration("dcrypt")
      .get<boolean>("askPasswordForFile")
  ) {
    key = uri.toString();
  } else {
    key = os.homedir();
  }

  return [key, path.basename(key)];
}
