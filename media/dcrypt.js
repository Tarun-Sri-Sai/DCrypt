(function () {
  const vscode = acquireVsCodeApi();
  let editor = null;

  vscode.postMessage({ command: "ready" });

  function initializeEditor(initialContent) {
    const styles = getComputedStyle(document.body);
    const bgColor = styles.getPropertyValue("--vscode-editor-background");
    const fgColor = styles.getPropertyValue("--vscode-editor-foreground");
    const lineHighlightBg = styles.getPropertyValue(
      "--vscode-editor-lineHighlightBackground"
    );
    const selectionBg = styles.getPropertyValue(
      "--vscode-editor-selectionBackground"
    );
    const selectionFg = styles.getPropertyValue(
      "--vscode-editor-selectionForeground"
    );
    const cursorColor = styles.getPropertyValue(
      "--vscode-editorCursor-foreground"
    );
    const lineNumbersFg = styles.getPropertyValue(
      "--vscode-editorLineNumber-foreground"
    );
    const lineNumbersActiveFg = styles.getPropertyValue(
      "--vscode-editorLineNumber-activeForeground"
    );
    const widgetBg = styles.getPropertyValue(
      "--vscode-editorWidget-background"
    );
    const widgetBorder = styles.getPropertyValue(
      "--vscode-editorWidget-border"
    );
    const linkColor = styles.getPropertyValue("--vscode-textLink-foreground");
    const linkActiveFg = styles.getPropertyValue(
      "--vscode-textLink-activeForeground"
    );

    const fontFamily = styles.getPropertyValue("--vscode-editor-font-family");
    const fontSize = styles.getPropertyValue("--vscode-editor-font-size");
    const fontWeight = styles.getPropertyValue("--vscode-editor-font-weight");
    const letterSpacing = styles.getPropertyValue(
      "--vscode-editor-font-letterSpacing"
    );

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
        monaco.editor.defineTheme("vscode-current", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": bgColor,
            "editor.foreground": fgColor,
            "editor.lineHighlightBackground": lineHighlightBg,
            "editor.selectionBackground": selectionBg,
            "editor.selectionForeground": selectionFg,
            "editorCursor.foreground": cursorColor,
            "editorLineNumber.foreground": lineNumbersFg,
            "editorLineNumber.activeForeground": lineNumbersActiveFg,
            "editorWidget.background": widgetBg,
            "editorWidget.border": widgetBorder,
            "textLink.foreground": linkColor,
            "textLink.activeForeground": linkActiveFg,
          },
        });

        editor = monaco.editor.create(
          document.getElementById("editor-container"),
          {
            value: initialContent,
            language: "plaintext",
            theme: "vscode-current",
            automaticLayout: true,
            lineNumbers: "on",
            minimap: {
              enabled: true,
            },
            scrollBeyondLastLine: true,
            renderLineHighlight: "all",
            cursorBlinking: "smooth",
            cursorStyle: "line",
            fontFamily: fontFamily || "Consolas, 'Courier New', monospace",
            fontSize: parseInt(fontSize) || 14,
            fontWeight: fontWeight || "normal",
            letterSpacing: parseFloat(letterSpacing) || 0,
            lineHeight:
              parseInt(
                styles.getPropertyValue("--vscode-editor-line-height")
              ) || 18,
            wordWrap: "on",
          }
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
      case "setLanguage":
        if (editor) {
          monaco.editor.setModelLanguage(editor.getModel(), message.language);
        }
        break;
    }
  });
})();
