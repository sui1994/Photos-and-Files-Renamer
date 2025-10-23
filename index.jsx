import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("flying");
  const [num, setNum] = useState("1"); // 文字列として初期化
  const [direction, setDirection] = useState("left");

  // typeが変更されたときにnumをリセット
  useEffect(() => {
    console.log(`Type changed to: ${type}, resetting num to "1"`);
    setNum("1");
  }, [type]);

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
          <div>Debug: Generated options array: [{Array.from({ length: 20 }, (_, i) => i + 1).join(", ")}]</div>
          <div>Debug: Array.from result length: {Array.from({ length: 20 }, (_, i) => i + 1).length}</div>

          <div style={{ marginBottom: "10px" }}>
            <label>キャラクター番号選択:</label>
            <select
              value={num}
              onChange={(e) => {
                console.log(`Selected value: ${e.target.value}`);
                setNum(e.target.value);
              }}
            >
              {Array.from({ length: 20 }, (_, i) => {
                const value = String(i + 1);
                console.log(`Rendering option: ${value}`);
                return (
                  <option key={i + 1} value={value}>
                    キャラクター {i + 1}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label>リスト表示（デバッグ用）:</label>
            <select value={num} onChange={(e) => setNum(e.target.value)} size="20" style={{ height: "auto", minHeight: "300px", display: "block", width: "200px" }}>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={`list-${i + 1}`} value={String(i + 1)}>
                  {i + 1} - キャラクター{i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div>
          <div>Debug: Walking mode - Options count: {[...Array(5).keys()].length}</div>
          <div>
            Debug: Current num value: "{num}" (type: {typeof num})
          </div>
          <div>Debug: Walking options: [{[...Array(5).keys()].map((val) => val + 1).join(", ")}]</div>

          <div>
            <label>
              <input type="radio" value="left" checked={direction === "left"} onChange={() => setDirection("left")} /> left
            </label>
            <label>
              <input type="radio" value="right" checked={direction === "right"} onChange={() => setDirection("right")} /> right
            </label>
          </div>

          <select value={num} onChange={(e) => setNum(e.target.value)}>
            {[...Array(5).keys()].map((val) => (
              <option key={val + 1} value={String(val + 1)}>
                {val + 1}
              </option>
            ))}
          </select>
        </div>
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
