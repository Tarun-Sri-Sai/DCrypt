import * as vscode from "vscode";
import * as util from "./util.js";
import * as openpgp from "openpgp";

export class DcryptTextEditorProvider
  implements vscode.CustomTextEditorProvider
{
  private readonly passwordStore: Map<string, string[]>;

  constructor(
    _context: vscode.ExtensionContext,
    passwordStore: Map<string, string[]>,
  ) {
    this.passwordStore = passwordStore;
  }

  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    _webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken,
  ): Promise<void> {
    const uri = document.uri;
    const fileContent = document.getText();
    const [passwordStoreKey, displayName] = util.getPasswordKey(uri);
    let passwords = this.passwordStore.get(passwordStoreKey) ?? [""];
    if (!passwords[0]) {
      passwords = [(await this.promptForPassword(displayName)) ?? ""];
      if (!passwords[0]) {
        vscode.window.showErrorMessage("No password was provided");
        return;
      }
      this.passwordStore.set(passwordStoreKey, passwords);
    }

    if (fileContent.length > 0) {
      try {
        const decryptedContent = (
          await openpgp.decrypt({
            message: await openpgp.readMessage({
              binaryMessage: Buffer.from(fileContent, "utf8")
            }),
            passwords,
            format: "utf8"
          })
        ).data;

        const edit = new vscode.WorkspaceEdit();
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount, 0);
        edit.replace(uri, new vscode.Range(start, end), decryptedContent);
        await vscode.workspace.applyEdit(edit);
      } catch (error: any) {
        vscode.window.showErrorMessage(`Failed to decrypt file: ${error}`);
        this.passwordStore.delete(passwordStoreKey);
        return;
      }
    }

    vscode.workspace.onDidSaveTextDocument(async (savedDoc) => {
      if (savedDoc.uri.toString() !== uri.toString()) {
        return;
      }
      await this.saveFile(uri, savedDoc.getText(), passwords, savedDoc.lineCount);
    });
  }

  private async promptForPassword(
    fileName: string,
  ): Promise<string | undefined> {
    return vscode.window.showInputBox({
      title: "DCrypt File",
      prompt: `Enter password for ${fileName}`,
      password: true,
      ignoreFocusOut: true,
    });
  }

  private async saveFile(
    uri: vscode.Uri,
    text: string,
    passwords: string[],
    lineCount: number
  ): Promise<void> {
    try {
      const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: text as string }),
        passwords,
      });

      const edit = new vscode.WorkspaceEdit();
      edit.replace(
        uri,
        new vscode.Range(0, 0, lineCount, 0),
        encrypted,
      );
      await vscode.workspace.applyEdit(edit);
    } catch (error: any) {
      vscode.window.showErrorMessage(
        `Failed to save encrypted file: ${error.message}`,
      );
    }
  }
}
