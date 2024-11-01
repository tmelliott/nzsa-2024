"use client";

import { use, useEffect, useState } from "react";
import R from "rserve-ts";
import appFuns, { type App } from "./app.r";

export default function Demo() {
  const [app, setApp] = useState<App>();

  const connect = async () => {
    const con = await R.create({
      host: "ws://localhost:8942",
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
          RSERVE DEMO
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

// ideas:
// - basic histogram of a sample of data (e.g., a bootstrap)
// - option to perform N bootstraps and see progress bar

const Rversion = ({ app }: { app: App }) => {
  const v = useVersion(app);
  return <div>Connected to: {v ?? "unknown"}</div>;
};

const useVersion = (app: App) => {
  const [version, setVersion] = useState<string>();
  useEffect(() => {
    const getVersion = async () => {
      const v = await app.version();
      setVersion(v.data);
    };
    getVersion();
  }, [app]);
  return version;
};

const Rhist = ({ app }: { app: App }) => {
  const [n, setN] = useState(10);
  const hist = useHist(app, n);
  console.log(hist);

  return (
    <div className="flex gap-2">
      <input
        type="number"
        value={n}
        size={5}
        className="p-2 text-sm text-gray-800"
        onChange={(e) => setN(parseInt(e.target.value))}
      />
      <div>
        {hist ? (
          <div className="mt-2 flex items-end gap-1">
            {Array.from(hist.counts).map((c, i) => (
              <div
                key={i}
                className="flex flex-col items-center"
                style={{ height: c * 10, width: 10, backgroundColor: "white" }}
              ></div>
            ))}
          </div>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};

const useHist = (app: App, n: number) => {
  const [hist, setHist] = useState<{
    breaks: Float64Array;
    counts: Int32Array;
  }>();
  useEffect(() => {
    const getHist = async () => {
      const h = await app.histSample(n);
      setHist({
        breaks: h.data.breaks.data,
        counts: h.data.counts.data,
      });
    };
    getHist();
  }, [app]);
  return hist;
};
