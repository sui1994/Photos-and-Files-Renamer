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

  // 飛行キャラクターの選択肢を明示的に配列で定義
  const flyingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  // 歩行キャラクターの選択肢
  const walkingOptions = [1, 2, 3, 4, 5];

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

          {/* 方法1: 通常のselect */}
          <div style={{ marginBottom: 15 }}>
            <label>ドロップダウン選択: </label>
            <select value={num} onChange={(e) => setNum(parseInt(e.target.value))} style={{ padding: 5, fontSize: 16, minWidth: 150 }}>
              {flyingOptions.map((option) => (
                <option key={option} value={option}>
                  キャラクター {option}
                </option>
              ))}
            </select>
          </div>

          {/* 方法2: ラジオボタン（1-10） */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>ラジオボタン選択 (1-10):</strong>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {flyingOptions.slice(0, 10).map((option) => (
                <label key={option} style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" name="flying-radio-1-10" value={option} checked={num === option} onChange={() => setNum(option)} />
                  <span style={{ marginLeft: 5 }}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 方法3: ラジオボタン（11-20） */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>ラジオボタン選択 (11-20):</strong>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {flyingOptions.slice(10, 20).map((option) => (
                <label key={option} style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" name="flying-radio-11-20" value={option} checked={num === option} onChange={() => setNum(option)} />
                  <span style={{ marginLeft: 5 }}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 方法4: 数値入力 */}
          <div style={{ marginBottom: 15 }}>
            <label>
              <strong>直接入力: </strong>
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
            </label>
          </div>

          {/* 方法5: ボタン選択 */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>ボタン選択:</strong>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 5, maxWidth: 500 }}>
              {flyingOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setNum(option)}
                  style={{
                    padding: 8,
                    backgroundColor: num === option ? "#007bff" : "#f8f9fa",
                    color: num === option ? "white" : "black",
                    border: "1px solid #ccc",
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                >
                  {option}
                </button>
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
            {walkingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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
    </div>
  );
}

export default App;
