import { useState, useEffect } from "react";

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

  const updateNum = (newNum) => {
    setNum(parseInt(newNum));
  };

  // 20個のボタンを生成する関数
  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 20; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => updateNum(i)}
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
      );
    }
    return buttons;
  };

  // 1-10のラジオボタン
  const renderRadio1to10 = () => {
    const radios = [];
    for (let i = 1; i <= 10; i++) {
      radios.push(
        <label key={i} style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
          <input type="radio" name="flying-1-10" value={i} checked={num === i} onChange={() => updateNum(i)} />
          <span style={{ marginLeft: 5 }}>{i}</span>
        </label>
      );
    }
    return radios;
  };

  // 11-20のラジオボタン
  const renderRadio11to20 = () => {
    const radios = [];
    for (let i = 11; i <= 20; i++) {
      radios.push(
        <label key={i} style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
          <input type="radio" name="flying-11-20" value={i} checked={num === i} onChange={() => updateNum(i)} />
          <span style={{ marginLeft: 5 }}>{i}</span>
        </label>
      );
    }
    return radios;
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>画像リネーム・ダウンロードツール v4.0 (React版)</h2>

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

          {/* 方法1: 数値入力（最も確実） */}
          <div style={{ marginBottom: 15 }}>
            <label>
              <strong>方法1 - 数値入力: </strong>
            </label>
            <input type="number" min="1" max="20" value={num} onChange={(e) => updateNum(e.target.value)} style={{ padding: 5, fontSize: 16, width: 80, marginLeft: 10 }} />
          </div>

          {/* 方法2: ボタングリッド */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>方法2 - ボタン選択:</strong>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
                gap: 5,
                maxWidth: 500,
                marginTop: 10,
              }}
            >
              {renderButtons()}
            </div>
          </div>

          {/* 方法3: ラジオボタン (1-10) */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>方法3 - ラジオボタン (1-10):</strong>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>{renderRadio1to10()}</div>
          </div>

          {/* 方法4: ラジオボタン (11-20) */}
          <div style={{ marginBottom: 15 }}>
            <div>
              <strong>方法4 - ラジオボタン (11-20):</strong>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>{renderRadio11to20()}</div>
          </div>

          {/* 方法5: セレクト（問題があるが参考用） */}
          <div style={{ marginBottom: 15 }}>
            <label>
              <strong>方法5 - セレクト（参考用）: </strong>
            </label>
            <select value={num} onChange={(e) => updateNum(e.target.value)} style={{ padding: 5, fontSize: 16, minWidth: 150, marginLeft: 10 }}>
              <option value="1">キャラクター 1</option>
              <option value="2">キャラクター 2</option>
              <option value="3">キャラクター 3</option>
              <option value="4">キャラクター 4</option>
              <option value="5">キャラクター 5</option>
              <option value="6">キャラクター 6</option>
              <option value="7">キャラクター 7</option>
              <option value="8">キャラクター 8</option>
              <option value="9">キャラクター 9</option>
              <option value="10">キャラクター 10</option>
              <option value="11">キャラクター 11</option>
              <option value="12">キャラクター 12</option>
              <option value="13">キャラクター 13</option>
              <option value="14">キャラクター 14</option>
              <option value="15">キャラクター 15</option>
              <option value="16">キャラクター 16</option>
              <option value="17">キャラクター 17</option>
              <option value="18">キャラクター 18</option>
              <option value="19">キャラクター 19</option>
              <option value="20">キャラクター 20</option>
            </select>
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
          <select value={num} onChange={(e) => updateNum(e.target.value)} style={{ padding: 5, fontSize: 16 }}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <strong>現在選択中: </strong>
        <span style={{ color: "#007bff", fontWeight: "bold", fontSize: 18 }}>{num}</span>
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

      <div style={{ marginTop: 30, padding: 15, background: "#f8f9fa", borderRadius: 5 }}>
        <h4>使用方法</h4>
        <p>
          <strong>推奨:</strong> 方法1（数値入力）または方法2（ボタン選択）を使用してください。
        </p>
        <p>セレクトで問題がある場合は、他の方法で16-20を確実に選択できます。</p>
      </div>
    </div>
  );
}

export default App;
