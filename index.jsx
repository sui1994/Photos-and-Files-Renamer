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

  const handleTypeChange = (newType) => {
    setType(newType);
    setNum(1);
  };

  // 完全に異なるアプローチ: HTMLの文字列として生成
  const createFlyingOptions = () => {
    const options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(
        <option key={`flying-${i}`} value={i}>
          キャラクター {i}
        </option>
      );
    }
    return options;
  };

  const createWalkingOptions = () => {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(
        <option key={`walking-${i}`} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>画像リネーム・ダウンロードツール v3.0</h2>

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

          {/* 方法1: 関数で生成 */}
          <div style={{ marginBottom: 15 }}>
            <label>方法1 - 関数生成: </label>
            <select value={num} onChange={(e) => setNum(parseInt(e.target.value))} style={{ padding: 5, fontSize: 16, minWidth: 150 }}>
              {createFlyingOptions()}
            </select>
          </div>

          {/* 方法2: 数値入力 */}
          <div style={{ marginBottom: 15 }}>
            <label>方法2 - 数値入力: </label>
            <input
              type="number"
              min="1"
              max="20"
              value={num}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= 20) {
                  setNum(val);
                }
              }}
              style={{ padding: 5, fontSize: 16, width: 80 }}
            />
          </div>

          {/* 方法3: ボタングリッド */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>方法3 - ボタン選択:</strong>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 5, maxWidth: 500, marginTop: 10 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
                <button
                  key={i}
                  onClick={() => setNum(i)}
                  style={{
                    padding: 8,
                    backgroundColor: num === i ? "#007bff" : "#f8f9fa",
                    color: num === i ? "white" : "black",
                    border: "1px solid #ccc",
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* 方法4: ラジオボタン */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>方法4 - ラジオボタン (1-10):</strong>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <label key={i} style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" name="flying-1-10" value={i} checked={num === i} onChange={() => setNum(i)} />
                  <span style={{ marginLeft: 5 }}>{i}</span>
                </label>
              ))}
            </div>
            <div>
              <strong>方法4 - ラジオボタン (11-20):</strong>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>
              {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
                <label key={i} style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" name="flying-11-20" value={i} checked={num === i} onChange={() => setNum(i)} />
                  <span style={{ marginLeft: 5 }}>{i}</span>
                </label>
              ))}
            </div>
          </div>
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
            {createWalkingOptions()}
          </select>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <strong>現在選択中: </strong>
        <span style={{ color: "#007bff", fontWeight: "bold" }}>{num}</span>
      </div>

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
    </div>
  );
}

export default App;
