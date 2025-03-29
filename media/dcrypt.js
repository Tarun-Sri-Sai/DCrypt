(function () {
  const vscode = acquireVsCodeApi();
  let editor = null;

  vscode.postMessage({ command: "ready" });

  function initializeEditor(initialContent) {
    const bgColor = getComputedStyle(document.body).getPropertyValue("--vscode-editor-background");
    const fgColor = getComputedStyle(document.body).getPropertyValue("--vscode-editor-foreground");

    const loaderScript = document.createElement("script");
    loaderScript.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/loader.js";
    loaderScript.onload = () => {
      require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs" } });

      require(["vs/editor/editor.main"], function () {
        monaco.editor.defineTheme("vscode-current", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": bgColor,
            "editor.foreground": fgColor,
          },
        });

        editor = monaco.editor.create(document.getElementById("editor-container"), {
          value: initialContent,
          language: "plaintext",
          theme: "vscode-current",
          automaticLayout: true,
        });

        let saveTimeout = null;
        editor.onDidChangeModelContent(() => {
          if (saveTimeout) {
            clearTimeout(saveTimeout);
          }

          saveTimeout = setTimeout(() => {
            const content = editor.getValue();

            vscode.postMessage({
              command: "save",
              text: content,
            });
          }, 1000);
        });
      });
    };
    document.body.appendChild(loaderScript);
  }

  window.addEventListener("message", (event) => {
    const message = event.data;
    switch (message.command) {
      case "setContent":
        initializeEditor(message.content);
        break;
      case "setLanguage":
        if (editor) {
          monaco.editor.setModelLanguage(editor.getModel(), message.language);
        }
        break;
    }
  });
})();
