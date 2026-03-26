import { useRef, useState, useLayoutEffect, useCallback } from "react";

// ── 常數 ──────────────────────────────────────────────────────────────────────
const SEGMENT_COUNT = 15;
const SEGMENT_DEG = 360 / SEGMENT_COUNT;
const COLORS = ['#ff8a80', '#8aa3ff', '#8fe388', '#f4ddb2', '#d9a5e8'];
const SPIN_DURATION_MS = 5300;

// ── 型別 ──────────────────────────────────────────────────────────────────────
type StatusType = 'pending' | 'win' | 'lose';

interface BackendResult {
  numbers: number[];
  winNumber: number;
  resultNumber: number;
  amount: number;
  isWin: boolean;
}

// ── 純函式工具 ───────────────────────────────────────────────────────────────
function shuffleNumbers(): number[] {
  const arr = Array.from({ length: SEGMENT_COUNT }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildConicGradient(numbers: number[]): string {
  let gradient = 'conic-gradient(';
  numbers.forEach((_, i) => {
    const startDeg = i * SEGMENT_DEG;
    const endDeg = (i + 1) * SEGMENT_DEG;
    gradient += `${COLORS[i % COLORS.length]} ${startDeg}deg ${endDeg}deg`;
    if (i < numbers.length - 1) gradient += ', ';
  });
  return gradient + ')';
}

function formatAmount(value: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value);
}

// 模擬後端 API
function fetchBackendResult(numbers: number[]): Promise<BackendResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const winIndex = Math.floor(Math.random() * numbers.length);
      const winNumber = numbers[winIndex];
      const isWin = Math.random() > 0.45;
      const amount = isWin ? (Math.floor(Math.random() * 10) + 1) * 100 : 0;

      let resultNumber: number;
      if (isWin) {
        resultNumber = winNumber;
      } else {
        const others = numbers.filter((n) => n !== winNumber);
        resultNumber = others[Math.floor(Math.random() * others.length)];
      }

      resolve({ numbers, winNumber, resultNumber, amount, isWin });
    }, 600);
  });
}

function calcNextRotation(currentRotation: number, numbers: number[], resultNumber: number): number {
  const index = numbers.findIndex((n) => n === resultNumber);
  if (index === -1) return currentRotation;

  const segmentCenter = index * SEGMENT_DEG + SEGMENT_DEG / 2;
  const extraRounds = 360 * (5 + Math.floor(Math.random() * 2));
  const targetMod = (360 - segmentCenter) % 360;
  const currentOffset = currentRotation % 360;
  let adjustment = (targetMod - currentOffset + 360) % 360;
  if (adjustment === 0) adjustment = 360;

  return currentRotation + extraRounds + adjustment;
}

// ── 元件 ─────────────────────────────────────────────────────────────────────
const WheelGame = () => {
  const wheelRef = useRef<HTMLDivElement>(null);

  // 輪盤資料
  const [numbers, setNumbers] = useState<number[]>(() => shuffleNumbers());
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0); // 不重渲染的即時值
  //  useRef : 不想讓 React 重繪、但想在 render 之間保留的資料（或 DOM 參考）

  // 顯示資料
  const [winNumber, setWinNumber] = useState<number | null>(null);
  const [amountDisplay, setAmountDisplay] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: StatusType; text: string }>({ type: 'pending', text: 'WAIT' });
  const [messageText, setMessageText] = useState('等待開始');

  // 控制
  const [spinning, setSpinning] = useState(false);

  // 計算輪盤半徑（DOM 掛載後才能量到真實值）
  const [radius, setRadius] = useState(150);
  useLayoutEffect(() => {
    //需要量 DOM 尺寸時用（useEffect 會有一閃問題）  
    // useEffect : DOM 畫完 → 瀏覽器已顯示畫面 → 才執行
    // useLayoutEffect : DOM 畫完前 → 瀏覽器還沒顯示 → 比較不會閃
    if (wheelRef.current) {
      setRadius(wheelRef.current.offsetWidth / 2);
    }
  }, []);

  // 計算 conic-gradient
  const wheelBg = buildConicGradient(numbers);

  const handleSpin = useCallback(async () => {
    // useCallback 記憶住上一次的 handleSpin，避免重複渲染
    if (spinning) return;

    setSpinning(true);
    setStatus({ type: 'pending', text: 'SPIN' });
    setMessageText('輪盤旋轉中...');
    setWinNumber(null);
    setAmountDisplay(null);

    // 先抽新號碼再請後端
    const newNumbers = shuffleNumbers();
    setNumbers(newNumbers);

    const backendData = await fetchBackendResult(newNumbers);

    setWinNumber(backendData.winNumber);
    setAmountDisplay(formatAmount(backendData.amount));

    const nextRotation = calcNextRotation(rotationRef.current, newNumbers, backendData.resultNumber);
    rotationRef.current = nextRotation;
    setRotation(nextRotation);

    setTimeout(() => {
      if (backendData.isWin) {
        setStatus({ type: 'win', text: 'WIN' });
        setMessageText(`恭喜中獎！\n數字：${backendData.winNumber}\n金額：${formatAmount(backendData.amount)}`);
      } else {
        setStatus({ type: 'lose', text: 'LOSE' });
        setMessageText(`很可惜，這次沒有中獎。\n中獎數字：${backendData.winNumber}\n停在數字：${backendData.resultNumber}`);
      }
      setSpinning(false);
    }, SPIN_DURATION_MS);
  }, [spinning]);

  return (
    <div className="flex flex-1 flex-col xl:flex-row ">
      <section className="panel flex-1">
         <div className="heading">
            <div>
              <h1 className="title">輪盤遊戲 Demo</h1>
              <p className="desc">按下 Spin 後開始旋轉，依照後端回傳結果停在指定數字，並判斷 win / lose。</p>
            </div>
          </div>
        <div className="wheel-wrap">
          <div className="pointer" />
          <div className="wheel-shadow" />
          <div
            ref={wheelRef}
            className="wheel"
            style={{
              background: wheelBg,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.12, 1)` : 'none',
            }}
          >
            <div className="label-layer">
              {numbers.map((num, index) => {
                const middleDeg = index * SEGMENT_DEG + SEGMENT_DEG / 2;
                return (
                  <div
                    key={`${num}-${index}`}
                    className="segment-label"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${middleDeg}deg) translateY(-${radius * 0.75}px)`,
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>

          <button className="center-btn" onClick={handleSpin} disabled={spinning}>
            Spin
          </button>
          {/* <div className="hub" /> */}
        </div>
      </section>

      <aside className="side-card flex-1">
        <h2 className="info-title">結果資訊</h2>

        <div className="block">
          <div className="label">目前輪盤數字</div>
          <div className="value">{numbers.join('、')}</div>
        </div>

        <div className="block">
          <div className="label">後端指定中獎數字</div>
          <div className="value">{winNumber ?? '-'}</div>
        </div>

        <div className="block">
          <div className="label">金額</div>
          <div className="value">{amountDisplay ?? '-'}</div>
        </div>

        <div className="block">
          <div className="label">結果</div>
          <div className={`status ${status.type}`}>{status.text}</div>
          <div className="log" style={{ whiteSpace: 'pre-line' }}>{messageText}</div>
        </div>
      </aside>
    </div>
  );
};

export default WheelGame;