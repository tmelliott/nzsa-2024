import { z } from "zod";
import { Robj } from "rserve-ts";

const appFuns = {
  version: Robj.ocap([], Robj.character(1)),
  histSample: Robj.ocap(
    [z.number()],
    Robj.list({
      breaks: Robj.numeric(0),
      counts: Robj.integer(0),
    }),
  ),
};

export const zapp = z.object(appFuns);
export type App = z.infer<typeof zapp>;

export default appFuns;
