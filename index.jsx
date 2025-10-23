import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("flying");
  const [num, setNum] = useState(1);
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

  // タイプ変更時にnumをリセット
  const handleTypeChange = (newType) => {
    setType(newType);
    setNum(1); // 常に1にリセット
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>画像リネーム・ダウンロードツール</h2>

      <div style={{ marginBottom: 20 }}>
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 20 }}>
          <input type="radio" value="flying" checked={type === "flying"} onChange={() => handleTypeChange("flying")} />
          flying-characters
        </label>
        <label>
          <input type="radio" value="walking" checked={type === "walking"} onChange={() => handleTypeChange("walking")} />
          walking-characters
        </label>
      </div>

      {type === "flying" ? (
        <div style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <strong>飛行キャラクター選択 (1-20)</strong>
          </div>
          <select value={num} onChange={(e) => setNum(parseInt(e.target.value))} style={{ padding: 5, fontSize: 16 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                キャラクター {i + 1}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <strong>歩行キャラクター選択</strong>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ marginRight: 20 }}>
              <input type="radio" value="left" checked={direction === "left"} onChange={() => setDirection("left")} />
              left
            </label>
            <label>
              <input type="radio" value="right" checked={direction === "right"} onChange={() => setDirection("right")} />
              right
            </label>
          </div>
          <select value={num} onChange={(e) => setNum(parseInt(e.target.value))} style={{ padding: 5, fontSize: 16 }}>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <strong>生成されるファイル名: </strong>
        <code style={{ background: "#f0f0f0", padding: 5, borderRadius: 3 }}>{getFileName()}</code>
      </div>

      <button
        onClick={download}
        disabled={!file}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          backgroundColor: file ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: file ? "pointer" : "not-allowed",
        }}
      >
        リネームしてダウンロード
      </button>

      <hr style={{ margin: "30px 0" }} />

      <div>
        <div style={{ marginBottom: 10 }}>
          <strong>フォルダに配置:</strong> images/changeable/flying-characters or walking-characters
        </div>
        <div>
          <strong>手順:</strong> ダウンロード後、上記フォルダにファイルを移動してください
        </div>
      </div>

      {/* デバッグ情報 */}
      <div style={{ marginTop: 30, padding: 15, background: "#f8f9fa", borderRadius: 5 }}>
        <h4>デバッグ情報</h4>
        <div>タイプ: {type}</div>
        <div>番号: {num}</div>
        <div>方向: {direction}</div>
        <div>ファイル選択済み: {file ? "はい" : "いいえ"}</div>
        {type === "flying" && <div>飛行キャラクター選択肢数: {Array.from({ length: 20 }).length}</div>}
        {type === "walking" && <div>歩行キャラクター選択肢数: {Array.from({ length: 5 }).length}</div>}
      </div>
    </div>
  );
}

export default App;
