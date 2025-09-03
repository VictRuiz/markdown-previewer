import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { marked } from "marked";
import hljs from "highlight.js";

// Configuración de marked.js
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  gfm: true,
  breaks: true
});

// Markdown de ejemplo (corrigiendo la imagen)
const defaultMarkdown = `
# Previsualizador de Markdown (H1)

## Subencabezado (H2)

Un [enlace](https://www.google.com) a Google.

Aquí hay un poco de código en línea, \`<div></div>\`, entre dos backticks.

\`\`\`javascript
// Esto es un bloque de código
function sumar(a, b) {
  return a + b;
}
\`\`\`

- Un elemento de lista
- Otro elemento de lista
- Y otro

> Esto es una cita en bloque.
> Se usa para destacar texto.

**Esto es texto en negrita.**

![Una imagen de ejemplo](https://images.unsplash.com/photo-1510486892693-0186360e-3118-4228-baec-8623435e2d54?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
`;

function App() {
  const [editorContent, setEditorContent] = useState(defaultMarkdown);

  const handleEditorChange = (e) => {
    setEditorContent(e.target.value);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans text-gray-200">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-8 text-center drop-shadow-lg">
        Previsualizador de Markdown
      </h1>
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Panel del Editor */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-3 text-blue-200">Editor</h2>
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <textarea
              id="editor"
              className="w-full h-80 p-6 bg-transparent border-none text-gray-300 placeholder-gray-500 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={editorContent}
              onChange={handleEditorChange}
            ></textarea>
          </div>
        </div>

        {/* Panel de Previsualización */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-3 text-blue-200">Vista Previa</h2>
          <div
            id="preview"
            className="w-full h-80 p-6 bg-gray-800 rounded-xl shadow-2xl overflow-y-auto text-gray-300 prose-sm prose-invert prose-blue transition-all"
            dangerouslySetInnerHTML={{
              __html: marked(editorContent)
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Renderizamos la app
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
