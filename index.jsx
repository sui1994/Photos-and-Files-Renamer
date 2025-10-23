import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("flying");
  const [num, setNum] = useState("1"); // 文字列として初期化
  const [direction, setDirection] = useState("left");

  const handleFile = (e) => setFile(e.target.files[0]);
  const getFileName = () => {
    if (type === "flying") return `character${num}.png`;
    return `walking-${direction}-${num}.png`;
  };

  const download = () => {
    if (!file) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = getFileName();
    link.click();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>画像リネーム・ダウンロードツール</h2>
      <input type="file" accept="image/*" onChange={handleFile} />
      <div>
        <label>
          <input type="radio" value="flying" checked={type === "flying"} onChange={() => setType("flying")} /> flying-characters
        </label>
        <label>
          <input type="radio" value="walking" checked={type === "walking"} onChange={() => setType("walking")} /> walking-characters
        </label>
      </div>
      {type === "flying" ? (
        <div>
          <div>Debug: Flying mode - Options count: {Array.from({ length: 20 }).length}</div>
          <div>
            Debug: Current num value: "{num}" (type: {typeof num})
          </div>
          <div>Debug: Generated options: {Array.from({ length: 20 }, (_, i) => i + 1).join(", ")}</div>

          <div style={{ marginBottom: "10px" }}>
            <label>ドロップダウン選択:</label>
            <select value={num} onChange={(e) => setNum(e.target.value)}>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  キャラクター {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>リスト選択（全20個表示）:</label>
            <select value={num} onChange={(e) => setNum(e.target.value)} size="20" style={{ height: "auto", minHeight: "300px", display: "block" }}>
              {Array.from({ length: 20 }, (_, i) => {
                console.log(`Creating option ${i + 1}`);
                return (
                  <option key={`list-${i + 1}`} value={String(i + 1)}>
                    キャラクター {i + 1}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      ) : (
        <>
          <label>
            <input type="radio" value="left" checked={direction === "left"} onChange={() => setDirection("left")} /> left
          </label>
          <label>
            <input type="radio" value="right" checked={direction === "right"} onChange={() => setDirection("right")} /> right
          </label>
          <select value={num} onChange={(e) => setNum(e.target.value)}>
            {[...Array(5).keys()].map((val) => (
              <option key={val + 1} value={String(val + 1)}>
                {val + 1}
              </option>
            ))}
          </select>
        </>
      )}
      <br />
      <button onClick={download}>リネームしてダウンロード</button>
      <hr />
      <div>
        <b>フォルダに配置:</b> images/changeable/flying-characters or walking-characters
      </div>
      <div>
        <b>手順:</b> ダウンロード後、上記フォルダにファイルを移動してください
      </div>
    </div>
  );
}

export default App;
