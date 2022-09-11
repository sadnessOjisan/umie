import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import init, { dummy_for_test_calling_wasm } from "./pkg/wasm";

function App() {
  const [loadWasm, setLoadWasmFlg] = useState(false);
  const [loadedImage, setImage] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    init()
      .then(() => {
        setLoadWasmFlg(true);
      })
      .then((err) => {
        console.error("err", err);
      });
  });

  useEffect(() => {
    if (!loadWasm) return;
  }, [loadWasm]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setImage(null);
    const image = new Image();
    const inputForm = e.target;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fileInputEl = inputForm["file"];
    const [file] = fileInputEl.files as FileList;
    if (!file) {
      alert("ファイルが選択されていません。");
      return;
    }
    console.log(fileInputEl.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (event) => {
      const imageUrl = event.target?.result;
      // When array buffer comes, you should read image as readAsDataURL not readAsArrayBuffer.
      if (typeof imageUrl !== "string") {
        alert("画像の読み込みに失敗しました。");
        return;
      }
      image.src = imageUrl;
    });
    image.onload = function () {
      setImage(image);
    };
  }, []);

  useEffect(() => {
    if (!loadedImage || !loadWasm) return;
    const canvasRenderingContext = canvasRef.current?.getContext("2d");
    if (!canvasRenderingContext) {
      alert("Not found canvas el");
      return;
    }
    canvasRenderingContext.drawImage(
      loadedImage,
      0,
      0,
      loadedImage.width,
      loadedImage.height
    );
    const imageData = canvasRenderingContext.getImageData(
      0,
      0,
      loadedImage.width,
      loadedImage.height
    );
    console.log(imageData.data);
    console.log(dummy_for_test_calling_wasm());
  }, [loadedImage, loadWasm]);

  return (
    <div className="App">
      hello
      <form onSubmit={handleSubmit}>
        <label htmlFor="grain-input">荒さ</label>
        <input type="number" min="0" id="grain-input"></input>
        <input type="file" name="file"></input>
        <button type="submit">submit</button>
      </form>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
