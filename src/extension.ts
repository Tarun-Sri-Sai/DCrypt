import * as vscode from "vscode";
import { DcryptEditorProvider } from "./dcryptEditor";

const passwordStore = new Map<string, string>();

export function activate(context: vscode.ExtensionContext) {
  const provider = new DcryptEditorProvider(passwordStore);

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider("dcrypt.editor", provider, {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: false,
    })
  );
}

export function deactivate() {
  passwordStore.clear();
}
