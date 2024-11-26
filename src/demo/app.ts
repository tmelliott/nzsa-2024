// app.ts
import { z } from "zod";
import { Robj } from "rserve-ts";

export const appSchema = {
  foo: Robj.ocap([z.number()], Robj.numeric(1)),
  bar: Robj.ocap([z.string()], Robj.integer()),
};
