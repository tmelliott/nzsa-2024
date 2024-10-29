import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { List, Slide, size } from "./layout";
import Demo from "./demo";

export default function HomePage() {
  return (
    <>
      <Slide>
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-5xl font-bold tracking-tight text-red-600">
            Introducing rserve-ts
          </h1>
          <h2 className="mt-4 text-2xl">
            A modernised library for R-to-web communication
          </h2>

          <div className="mt-12 text-center">
            <p className="font-bold text-red-600">Tom Elliott</p>
            <p className="text-sm">NZSA 2024, Wellington</p>
          </div>

          <div
            className={`relative mt-24 w-full`}
            style={{
              height: size(12),
            }}
          >
            <Image src="/ial-logo.png" alt="" fill={true} objectFit="contain" />
          </div>
        </div>
      </Slide>

      <Slide title="What is Rserve?">
        <div className="flex justify-center">DIAGRAM</div>

        <List
          items={[
            "Really cool, especially in Ocap mode",
            "Last updated ~6 years ago",
            "Callbacks, plain old JavaScript, one big ol' object",
          ]}
        />
      </Slide>

      <Slide title="What is ReactJS/Typescript?">
        <div>
          <h4 className="font-bold">ReactJS</h4>
          <List
            items={[
              "framework for building interactive web apps",
              "increasingly popular, 1000's of packages (npmjs.com)",
            ]}
          />
        </div>

        <div>
          <h4 className="font-bold">Typescript</h4>
          <List
            items={[
              "adds types to JavaScript",
              "development-time errors (literally as you type)",
              "autocomplete (+ copilot = 🚀)",
            ]}
          />
        </div>
      </Slide>

      <Slide>
        <div className="flex flex-1 items-center text-center text-3xl italic">
          <p>
            But &hellip; what if you're interfacing with an{" "}
            <strong className="text-green-600">untyped</strong> ecosystem like
            R?
          </p>
        </div>
      </Slide>

      <Slide title="Type assertion">
        <h2 className="-mt-4 text-xl italic text-gray-200">
          aka &ldquo;My To-do List&rdquo;
        </h2>

        <div className="flex gap-12">
          <div className="h-full flex-1 rounded border border-gray-500 px-4 py-3 shadow-lg">
            From R
            <List
              items={[
                "possible, but not fun",
                "functions that have explicitly defined input and output types",
              ]}
            />
          </div>
          <div className="h-full flex-1 rounded border border-gray-500 px-4 py-3 shadow-lg">
            From JS/TS
            <List
              items={[
                "zod (usually for APIs etc)",
                "parses objects at run-time, throws error if invalid",
                "remaining code can assume object is valid",
              ]}
            />
          </div>
        </div>
      </Slide>

      <Slide title="rserve-ts">
        <List
          items={[
            "Early work figuring out the data types, their R and JS shapes",
            "Writing helper functions for creating Zod schemas",
            "Converting from callbacks to promises",
          ]}
        />

        <p className="mt-12 italic">And now, let's see it in action &hellip;</p>
      </Slide>

      <Slide title="Some R functions that do something cool">
        <div className="flex flex-1 items-center justify-center text-sm">
          <SyntaxHighlighter
            language="r"
            customStyle={{
              borderRadius: "0.5rem",
            }}
          >
            {Rcode}
          </SyntaxHighlighter>
        </div>
      </Slide>

      <Slide title="Define types/schema">
        <div className="flex flex-1 items-center justify-center text-sm">
          <SyntaxHighlighter
            language="typescript"
            customStyle={{
              borderRadius: "0.5rem",
            }}
          >
            {appSchema}
          </SyntaxHighlighter>
        </div>
      </Slide>

      <Slide title="Write app">
        <div className="flex flex-1 items-center justify-center overflow-scroll text-sm">
          <SyntaxHighlighter
            language="typescript"
            customStyle={{
              borderRadius: "0.5rem",
            }}
          >
            {appCode}
          </SyntaxHighlighter>
        </div>
      </Slide>

      <Slide title="A better example &hellip;">
        <div className="flex-1">
          <Demo />
        </div>
      </Slide>
    </>
  );
}

const Rcode =
  "# app.R \n\
library(Rserve) \n\
\n\
list( \n\
  foo = ocap(function(x) x + 1), \n\
  bar = ocap(function(str) seq_len(nchar(str))) \n\
)";

const appSchema =
  "// app.ts \n\
import { z } from 'zod'; \n\
import { Robj } from 'rserve-ts'; \n\
\n\
export const appSchema = { \n\
  foo: Robj.ocap([z.number()], Robj.double(1)), \n\
  bar: Robj.ocap([z.string()], Robj.integer()), \n\
};";

const appCode =
  '// app.ts \n\
import { R } from \'rserve-ts\'; \n\
import { appSchema } from \'./app\'; \n\
\n\
(async () => { \n\
  const s = await R.connect({ host: "ws://localhost:8181" }); \n\
  const app = await s.ocap(appSchema); \n\
\n\
  const num: number = 5; \n\
  const x = await app.foo(num); // x: number \n\
  // await app.foo("hello"); // ts-error \n\
\n\
  const y = app.bar("hello"); // y: number | \n\
  //   (Int32Array & { r_type: "int_array"; }; \n\
  y.map((i) => console.log(i - 1)); [0, 1, 2, 3, 4] \n\
})();';
