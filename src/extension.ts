import * as vscode from "vscode";
import * as util from "./util";
import path from "path";

const passwordStore = new Map<string, string>();

export function activate(context: vscode.ExtensionContext) {
  const provider = new DCryptEditorProvider(context);

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

class DCryptEditorProvider implements vscode.CustomEditorProvider<vscode.CustomDocument> {
  public readonly onDidChangeCustomDocument: vscode.Event<vscode.CustomDocumentEditEvent<vscode.CustomDocument>> =
    new vscode.EventEmitter<vscode.CustomDocumentEditEvent<vscode.CustomDocument>>().event;
  private readonly context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  async openCustomDocument(
    uri: vscode.Uri,
    openContext: vscode.CustomDocumentOpenContext,
    token: vscode.CancellationToken
  ): Promise<vscode.CustomDocument> {
    return { uri, dispose: () => {} };
  }

  async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken
  ): Promise<void> {
    const uri = document.uri;
    const fileContent = await this.readFile(uri);

    let password = passwordStore.get(uri.toString());
    if (!password) {
      password = await this.promptForPassword(path.basename(uri.toString()));
      if (!password) {
        vscode.window.showErrorMessage("No password was provided");
        setImmediate(() => webviewPanel.dispose());
        return;
      }
      passwordStore.set(uri.toString(), password);
    }

    let decryptedContent = "";

    if (fileContent.length > 0) {
      try {
        const [ivBase64, encryptedContentBase64] = fileContent.split(":");
        if (ivBase64 && encryptedContentBase64) {
          decryptedContent = util.decrypt(encryptedContentBase64, ivBase64, password);
        }
      } catch (error: any) {
        vscode.window.showErrorMessage("Failed to decrypt file");
        passwordStore.delete(uri.toString());
        setImmediate(() => webviewPanel.dispose());
        return;
      }
    }

    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = this.getWebviewContent(decryptedContent);

    const messageListener = webviewPanel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "save":
          await this.saveFile(uri, message.text, password);
          break;
      }
    });

    webviewPanel.onDidDispose(() => {
      messageListener.dispose();
    });
  }

  private async promptForPassword(fileName: string): Promise<string | undefined> {
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

  private async saveFile(uri: vscode.Uri, content: string, password: string): Promise<void> {
    try {
      const iv = util.getRandomIv();
      const ivBase64 = iv.toString("base64");

      const encryptedContent = util.encrypt(content, iv, password);

      const fileContent = `${ivBase64}:${encryptedContent}`;

      await vscode.workspace.fs.writeFile(uri, Buffer.from(fileContent, "utf-8"));

      vscode.window.showInformationMessage("File encrypted and saved");
    } catch (error: any) {
      vscode.window.showErrorMessage(`Failed to save encrypted file: ${error.message}`);
    }
  }

  private getWebviewContent(initialContent: string): string {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>DCrypt Editor</title>
                <style>
                    body, html {
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    }
                    
                    #editor-container {
                        height: 100vh;
                        width: 100%;
                    }
                    
                    .monaco-editor {
                        width: 100%;
                        height: 100%;
                    }
                </style>
            </head>
            <body>
                <div id="editor-container"></div>
                
                <script>
                    (function() {
                        const vscode = acquireVsCodeApi();
                        let editor = null;
                        
                        const loaderScript = document.createElement('script');
                        loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/loader.js';
                        loaderScript.onload = () => {
                            require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' }});
                            
                            require(['vs/editor/editor.main'], function() {
                                editor = monaco.editor.create(document.getElementById('editor-container'), {
                                    value: ${JSON.stringify(initialContent)},
                                    language: 'plaintext',
                                    theme: 'vs-dark',
                                    automaticLayout: true
                                });
                                
                                let saveTimeout = null;
                                editor.onDidChangeModelContent(() => {
                                    if (saveTimeout) {
                                        clearTimeout(saveTimeout);
                                    }
                                    
                                    saveTimeout = setTimeout(() => {
                                        const content = editor.getValue();
                                        vscode.postMessage({
                                            command: 'save',
                                            text: content
                                        });
                                    }, 1000);
                                });
                            });
                        };
                        document.body.appendChild(loaderScript);
                        
                        window.addEventListener('message', event => {
                            const message = event.data;
                            switch (message.command) {
                                case 'setLanguage':
                                    if (editor) {
                                        monaco.editor.setModelLanguage(editor.getModel(), message.language);
                                    }
                                    break;
                            }
                        });
                    }());
                </script>
            </body>
            </html>
        `;
  }

  public saveCustomDocument(document: vscode.CustomDocument, cancellation: vscode.CancellationToken): Promise<void> {
    return Promise.resolve();
  }

  public saveCustomDocumentAs(
    document: vscode.CustomDocument,
    destination: vscode.Uri,
    cancellation: vscode.CancellationToken
  ): Promise<void> {
    return Promise.resolve();
  }

  public revertCustomDocument(document: vscode.CustomDocument, cancellation: vscode.CancellationToken): Promise<void> {
    return Promise.resolve();
  }

  public backupCustomDocument(
    document: vscode.CustomDocument,
    context: vscode.CustomDocumentBackupContext,
    cancellation: vscode.CancellationToken
  ): Promise<vscode.CustomDocumentBackup> {
    return Promise.resolve({
      id: context.destination.toString(),
      delete: () => {},
    });
  }
}
