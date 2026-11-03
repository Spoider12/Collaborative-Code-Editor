"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import * as Y from "yjs";

export default function CodeEditor() {
  const handleMount: OnMount = async (editor) => {
    const model = editor.getModel();
    if (!model) return;

    const [{ MonacoBinding }, { SocketIOProvider }] = await Promise.all([
      import("y-monaco"),
      import("y-socket.io"),
    ]);
    const ydoc = new Y.Doc();
    const provider = new SocketIOProvider(
      "http://localhost:3001",
      "my-roomname",
      ydoc,
      { autoConnect: true },
    );
    new MonacoBinding(
      ydoc.getText("monaco"),
      model,
      new Set([editor]),
      provider.awareness,
    );
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      theme="vs-dark"
      onMount={handleMount}
    />
  );
}
