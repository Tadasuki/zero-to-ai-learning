const PYODIDE_VERSION = "v314.0.7";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

const pyodideReady = loadPyodide({ indexURL: PYODIDE_BASE });

pyodideReady
  .then(() => self.postMessage({ type: "ready" }))
  .catch((error) => self.postMessage({ type: "load-error", error: String(error) }));

self.onmessage = async (event) => {
  const { runId, code, test } = event.data;
  let scope;
  let output = [];

  try {
    const pyodide = await pyodideReady;
    pyodide.setStdout({ batched: (message) => {
      output.push(message);
      self.postMessage({ type: "output", runId, message });
    }});
    pyodide.setStderr({ batched: (message) => {
      output.push(message);
      self.postMessage({ type: "output", runId, message });
    }});
    await pyodide.loadPackagesFromImports(`${code}\n${test}`);
    scope = pyodide.runPython("dict()");

    try {
      await pyodide.runPythonAsync(code, { globals: scope });
    } catch (error) {
      self.postMessage({ type: "result", runId, status: "error", error: String(error), output: output.join("\n") });
      return;
    }

    scope.set("__output__", output.join("\n"));
    try {
      await pyodide.runPythonAsync(test, { globals: scope });
      self.postMessage({ type: "result", runId, status: "passed", output: output.join("\n") });
    } catch (error) {
      self.postMessage({ type: "result", runId, status: "incomplete", error: String(error), output: output.join("\n") });
    }
  } catch (error) {
    self.postMessage({ type: "result", runId, status: "load-error", error: String(error), output: output.join("\n") });
  } finally {
    if (scope) scope.destroy();
  }
};
