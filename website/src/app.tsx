import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import init, { exec_mosaic } from "./pkg/wasm";

function App() {
  const [loadWasm, setLoadWasmFlg] = useState(false);
  const [loadedImage, setImage] = useState<HTMLImageElement | null>(null);

  const rawImagecanvasRef = useRef<HTMLCanvasElement>(null);
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
    rawImagecanvasRef.current?.getContext("2d")?.putImageData(imageData, 0, 0);

    const mosaiced = exec_mosaic(
      imageData.data,
      loadedImage.width,
      loadedImage.height
    );
    console.log("mosaiced", mosaiced);
    const iamgedata = new ImageData(
      new Uint8ClampedArray(mosaiced.buffer),
      loadedImage.width
    );
    canvasRef.current?.getContext("2d")?.putImageData(iamgedata, 0, 0);
  }, [loadedImage, loadWasm]);

  return (
    <div className="App">
      <h1>UMIE</h1>
      <p>Online wasm based mosaic tool</p>
      <p>
        Tech stack is{" "}
        <a href="https://blog.ojisan.io/rust-mosaic-web-app/" target="_brank">
          here
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="grain-input">荒さ</label>
        <input type="number" min="0" id="grain-input"></input>
        <label htmlFor="file-input">画像</label>
        <input type="file" name="file" id="file-input"></input>
        <br />
        <button type="submit">Run</button>
      </form>
      <canvas
        ref={rawImagecanvasRef}
        width={loadedImage?.width}
        height={loadedImage?.height}
        style={{ maxWidth: "100%", maxHeight: "400px" }}
      ></canvas>
      <canvas
        ref={canvasRef}
        width={loadedImage?.width}
        height={loadedImage?.height}
        style={{ maxWidth: "100%", maxHeight: "400px" }}
      ></canvas>
    </div>
  );
}

export default App;
