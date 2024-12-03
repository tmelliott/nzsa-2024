"use client";

import { useEffect, useState } from "react";
import R from "rserve-ts";
import appFuns, { type App } from "../../demo/app.r";

export default function Demo() {
  const [app, setApp] = useState<App>();

  const connect = async () => {
    const con = await R.create({
      // host: "ws://localhost:8942",
      host: "wss://elliott-nzsa2024-ws.up.railway.app",
    });
    const a = await con.ocap(appFuns);
    setApp(a);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center rounded bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-lg">
      {app ? (
        <div className="flex flex-col gap-2">
          <Rversion app={app} />
          <Rhist app={app} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            className="rounded bg-green-600 px-4 py-2 text-lg font-bold uppercase text-white hover:bg-green-700"
            onClick={connect}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
}

const Rversion = ({ app }: { app: App }) => {
  const v = useVersion(app);
  return <div>Connected to: {v ?? "unknown"}</div>;
};

const useVersion = (app: App) => {
  const [version, setVersion] = useState<string>();
  useEffect(() => {
    const getVersion = async () => {
      const v = await app.version();
      setVersion(v);
    };
    void getVersion();
  }, [app]);
  return version;
};

const Rhist = ({ app }: { app: App }) => {
  const [n, setN] = useState(10);
  const { hist, update } = useHist(app, n);

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        Sample size:
        <input
          type="number"
          value={n}
          size={5}
          className="p-2 text-sm text-gray-800"
          onChange={(e) => setN(parseInt(e.target.value))}
        />
        <button
          className="rounded bg-orange-700 p-2 text-sm text-slate-50 shadow hover:bg-orange-800"
          onClick={() => update()}
        >
          Generate
        </button>
      </div>
      <div className="mt-2 h-32 w-full border-b pb-1">
        {hist && (
          <div className="flex h-full w-full items-end justify-between gap-1">
            {Array.from(hist.freq).map((f, i) => (
              <div
                className="flex h-full w-full flex-1 cursor-pointer items-end hover:bg-slate-700"
                onClick={() => app.addMode(i - 10)}
                key={i}
              >
                <div
                  className="flex w-full flex-1 cursor-pointer flex-col items-center bg-white transition-[height] duration-300 hover:bg-gray-100"
                  style={{
                    height: `${f * 100}%`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const useHist = (app: App, n: number) => {
  const [hist, setHist] = useState<{
    breaks: Float64Array;
    counts: Int32Array;
    freq: number[];
  }>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const getHist = async () => {
    const h = await app.histSample(n);
    const nmax = Math.max(...h.counts);
    if (hist === undefined) {
      setHist({
        breaks: h.breaks,
        counts: h.counts.map(() => 0),
        freq: Array.from(h.counts).map(() => 0),
      });
    }
    setTimeout(
      () =>
        setHist({
          breaks: h.breaks,
          counts: h.counts,
          freq: Array.from(h.counts).map((c) => c / nmax),
        }),
      100,
    );
  };

  const update = () => {
    if (n < 2) return;
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => void getHist(), 200));

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  };
  return {
    hist,
    update,
  };
};
