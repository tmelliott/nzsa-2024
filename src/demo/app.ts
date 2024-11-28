// app.ts
import R from "rserve-ts";
import appFuns from "./app.r";

export const main = async () => {
  const s = await R.create({ host: "ws://localhost:8181" });
  const app = await s.ocap(appFuns);

  await app.version();
};
