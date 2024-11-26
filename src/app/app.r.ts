import { z } from "zod";
import { Robj, ocap } from "rserve-ts";

const appFuns = {
  version: z.function().returns(z.promise(Robj.character(1))),
  histSample: z
    .function()
    .args(z.number())
    .returns(
      z.promise(
        Robj.list({
          breaks: Robj.numeric(0),
          counts: Robj.integer(0),
        }),
      ),
    ),
};

const zapp = z.object(appFuns);
export type App = z.infer<typeof zapp>;

export default appFuns;
