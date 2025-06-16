(function () {
  const vscode = acquireVsCodeApi();
  let editor = null;

  vscode.postMessage({ command: "ready" });

  function initializeEditor(initialContent) {
    const loaderScript = document.createElement("script");
    loaderScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/loader.js";
    loaderScript.onload = () => {
      require.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs",
        },
      });

      require(["vs/editor/editor.main"], function () {
        editor = monaco.editor.create(
          document.getElementById("editor-container"),
          {
            value: initialContent,
            language: "plaintext",
            automaticLayout: true,
          },
        );

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
    }
  });
})();
