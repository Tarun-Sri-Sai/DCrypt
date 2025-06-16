import * as vscode from "vscode";
import * as util from "./util.js";
import * as openpgp from "openpgp";

export class DcryptTextEditorProvider
  implements vscode.CustomTextEditorProvider
{
  private readonly passwordStore: Map<string, string[]>;
  private readonly context: vscode.ExtensionContext;

  constructor(
    context: vscode.ExtensionContext,
    passwordStore: Map<string, string[]>,
  ) {
    this.context = context;
    this.passwordStore = passwordStore;
  }

  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
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
        setImmediate(() => webviewPanel.dispose());
        return;
      }
      this.passwordStore.set(passwordStoreKey, passwords);
    }

    let decryptedContent = "";

    if (fileContent.length > 0) {
      try {
        decryptedContent = (
          await openpgp.decrypt({
            message: await openpgp.readMessage({
              binaryMessage: Buffer.from(fileContent, "utf8"),
            }),
            passwords,
            format: "utf8",
          })
        ).data;
      } catch (error: any) {
        vscode.window.showErrorMessage("Failed to decrypt file");
        this.passwordStore.delete(passwordStoreKey);
        setImmediate(() => webviewPanel.dispose());
        return;
      }
    }

    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = this.getWebviewContent(webviewPanel.webview);

    const messageListener = webviewPanel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "ready":
            webviewPanel.webview.postMessage({
              command: "setContent",
              content: decryptedContent,
            });
            break;
          case "save":
            await this.saveFile(uri, message.text, passwords, document.lineCount);
            break;
        }
      },
    );

    webviewPanel.onDidDispose(() => {
      messageListener.dispose();
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

  private getWebviewContent(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "dcrypt.js"),
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "dcrypt.css"),
    );
    const nonce = util.getNonce();

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; 
                                                            style-src ${webview.cspSource} https://cdnjs.cloudflare.com 'unsafe-inline';
                                                            script-src 'nonce-${nonce}' ${webview.cspSource} https://cdnjs.cloudflare.com;
                                                            worker-src blob:;
                                                            font-src ${webview.cspSource} https://cdnjs.cloudflare.com;">
        <title>DCrypt Editor</title>
        <link href="${styleUri}" rel="stylesheet">
      </head>
      <body>
        <div id="editor-container"></div>

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}
