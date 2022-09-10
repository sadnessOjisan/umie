import { useEffect, useState } from "react";
import "./App.css";
import init, { dummy_for_test_calling_wasm } from "./pkg/wasm";

function App() {
  const [loadWasm, setLoadWasmFlg] = useState(false);

  useEffect(() => {
    init().then(() => {
      setLoadWasmFlg(true);
    });
  });

  useEffect(() => {
    if (!loadWasm) return;
    alert(`value from wasm: ${dummy_for_test_calling_wasm()}`);
  }, [setLoadWasmFlg]);

  return <div className="App">hello</div>;
}

export default App;
