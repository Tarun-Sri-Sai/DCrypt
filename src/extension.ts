import * as vscode from "vscode";
import { DcryptTextEditorProvider } from "./dcryptEditor.js";

const passwordStore = new Map<string, string[]>();

export function activate(context: vscode.ExtensionContext) {
  const provider = new DcryptTextEditorProvider(context, passwordStore);

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider("dcrypt.editor", provider, {
      webviewOptions: { retainContextWhenHidden: true },
    }),
  );
}

export function deactivate() {
  passwordStore.clear();
}
