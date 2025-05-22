import * as vscode from "vscode";
import * as util from "./util";
import path from "path";
import os from "os";

export class DcryptEditorProvider
  implements vscode.CustomEditorProvider<vscode.CustomDocument>
{
  public readonly onDidChangeCustomDocument: vscode.Event<
    vscode.CustomDocumentEditEvent<vscode.CustomDocument>
  > = new vscode.EventEmitter<
    vscode.CustomDocumentEditEvent<vscode.CustomDocument>
  >().event;
  private readonly passwordStore: Map<string, string>;
  private readonly context: vscode.ExtensionContext;

  constructor(
    context: vscode.ExtensionContext,
    passwordStore: Map<string, string>,
  ) {
    this.context = context;
    this.passwordStore = passwordStore;
  }

  async openCustomDocument(
    uri: vscode.Uri,
    _openContext: vscode.CustomDocumentOpenContext,
    _token: vscode.CancellationToken,
  ): Promise<vscode.CustomDocument> {
    return { uri, dispose: () => {} };
  }

  async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken,
  ): Promise<void> {
    const uri = document.uri;
    const fileContent = await this.readFile(uri);

    const userDirectory = os.homedir(); // Use the user directory as the key for mapping password
    let password = this.passwordStore.get(userDirectory);
    if (!password) {
      password = await this.promptForPassword(path.basename(userDirectory));
      if (!password) {
        vscode.window.showErrorMessage("No password was provided");
        setImmediate(() => webviewPanel.dispose());
        return;
      }
      this.passwordStore.set(userDirectory, password);
    }

    let decryptedContent = "";

    if (fileContent.length > 0) {
      try {
        const [ivBase64, encryptedContentBase64] = fileContent.split(":");
        if (ivBase64 && encryptedContentBase64) {
          decryptedContent = util.decrypt(
            encryptedContentBase64,
            ivBase64,
            password,
          );
        }
      } catch (error: any) {
        vscode.window.showErrorMessage("Failed to decrypt file");
        this.passwordStore.delete(userDirectory);
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
            await this.saveFile(uri, message.text, password);
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

  private async readFile(uri: vscode.Uri): Promise<string> {
    try {
      const fileData = await vscode.workspace.fs.readFile(uri);
      return Buffer.from(fileData).toString("utf-8");
    } catch (error) {
      return "";
    }
  }

  private async saveFile(
    uri: vscode.Uri,
    content: string,
    password: string,
  ): Promise<void> {
    try {
      const iv = util.getRandomIv();
      const ivBase64 = iv.toString("base64");

      const encryptedContent = util.encrypt(content, iv, password);

      const fileContent = `${ivBase64}:${encryptedContent}`;

      await vscode.workspace.fs.writeFile(
        uri,
        Buffer.from(fileContent, "utf-8"),
      );
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

  public saveCustomDocument(
    _document: vscode.CustomDocument,
    _cancellation: vscode.CancellationToken,
  ): Promise<void> {
    return Promise.resolve();
  }

  public saveCustomDocumentAs(
    _document: vscode.CustomDocument,
    _destination: vscode.Uri,
    _cancellation: vscode.CancellationToken,
  ): Promise<void> {
    return Promise.resolve();
  }

  public revertCustomDocument(
    _document: vscode.CustomDocument,
    _cancellation: vscode.CancellationToken,
  ): Promise<void> {
    return Promise.resolve();
  }

  public backupCustomDocument(
    _document: vscode.CustomDocument,
    context: vscode.CustomDocumentBackupContext,
    _cancellation: vscode.CancellationToken,
  ): Promise<vscode.CustomDocumentBackup> {
    return Promise.resolve({
      id: context.destination.toString(),
      delete: () => {},
    });
  }
}
