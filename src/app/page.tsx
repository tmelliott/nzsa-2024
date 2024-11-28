import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";

import Demo from "./components/Demo";
import { RserveDiagram } from "./components/RserveDiagram";
import { type Metadata } from "next";
import Slide from "./components/Slide";
import List from "./components/List";
import { size } from "./lib/helpers";

export const metadata: Metadata = {
  title: "Introducing rserve-ts",
};

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
            <p className="font-bold text-red-500">Tom Elliott</p>
            <p className="text-sm">NZSA 2024, Wellington</p>
          </div>

          <div
            className={`relative mt-24 w-full`}
            style={{
              height: size(12),
            }}
          >
            <Image
              src="/ial-logo.png"
              alt=""
              fill={true}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Slide>

      <Slide title="">
        <div className="relative h-full">
          <Image
            src="/inzight.png"
            alt="Rserve"
            fill={true}
            className="object-contain py-2"
            priority
          />
        </div>
      </Slide>

      <Slide title="iNZight's future">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative h-24 rounded bg-white/20 shadow">
              <Image
                src="/rlogo.png"
                alt="Rserve"
                fill={true}
                className="object-contain py-2"
              />
            </div>
            <List
              items={["Data analysis", "Data wrangling", "Runs anywhere"]}
            />
          </div>

          <div className="flex-1">
            <div className="relative h-24 rounded bg-white/20 shadow">
              <Image
                src="/web3.png"
                alt="Web technologies"
                fill={true}
                className="object-contain py-1"
              />
            </div>
            <List
              items={[
                "Front-end user interfaces",
                "Highly flexible",
                "Cross-platform",
              ]}
            />
          </div>
        </div>
      </Slide>

      <Slide title="Rserve">
        <RserveDiagram />

        <div>
          <h2>
            <strong className="font-mono text-blue-400">rserve-js</strong>:
            client library for JavaScript
          </h2>
          <List
            items={[
              "Object-capability (Ocap) mode",
              "Last updated ~6 years ago",
              "Outdated patterns, no Typescript support",
            ]}
          />
        </div>

        <div className="text-xs">
          Urbanek (2003){" "}
          <em>
            Rserve - A Fast Way to Provide R Functionality to Applications
          </em>
          , Proceedings of the 3rd Int. Workshop on Distributed Statistical
          Computing (DSC-2003), 1&ndash;11.
        </div>
      </Slide>

      <Slide title="Typescript">
        {/* <div>
          <h4 className="font-bold">ReactJS</h4>
          <List
            items={[
              "Framework for building interactive web apps",
              "Increasingly popular, 1000's of packages (npmjs.com)",
            ]}
          />
        </div> */}

        <List
          items={[
            "Adds types to JavaScript",
            "Development-time errors (literally as you type)",
            "Autocomplete (+ copilot = 🚀)",
          ]}
        />
      </Slide>

      <Slide>
        <div className="flex flex-1 items-center text-center text-3xl italic">
          <p>
            But &hellip; what if you&apos;re interfacing with an{" "}
            <strong className="text-green-600">untyped</strong> ecosystem like
            R?
          </p>
        </div>
      </Slide>

      <Slide title="Type assertion">
        <h2 className="-mt-4 text-xl italic text-gray-200"></h2>

        <div className="relative">
          <div className="absolute right-0 flex flex-col items-center px-4 text-black">
            <Image
              src="https://zod.dev/logo.svg"
              alt="Zod"
              width={150}
              height={100}
            />
            zod.dev
          </div>
          <SyntaxHighlighter
            language="typescript"
            customStyle={{
              borderRadius: "0.5rem",
            }}
          >
            {`import { z } from 'zod';

const dataSchema = z.object({
  name: string,
  age: number
});
const data = dataSchema
  .parse({ name: 'Henry', age: 27 }); // okay!
console.log(data.name + " is " + data.age);
// "Henry is 27";
  `}
          </SyntaxHighlighter>
        </div>
      </Slide>

      <Slide title="rserve-ts">
        <List
          items={[
            "Early work figuring out the data types, their R and JS shapes",
            "Writing helper functions for creating Zod schemas",
            "Modular export",
            "Replace callbacks with promises",
          ]}
        />
      </Slide>

      <Slide title="A simple sampling app">
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

      <Slide title="App schema">
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
        <div className="flex flex-1 items-center justify-center overflow-scroll text-xl">
          Live coding demo 😬🤞
          {/* video coding.mp4 */}
          {/* <video controls className="rounded border border-slate-500 shadow">
            <source src="/coding.mp4" type="video/mp4" />
          </video> */}
          {/* <SyntaxHighlighter
            language="typescript"
            customStyle={{
              borderRadius: "0.5rem",
            }}
          >
            {appCode}
          </SyntaxHighlighter> */}
        </div>
      </Slide>

      <Slide title="A better example &hellip;">
        <div className="flex-1">
          <Demo />
        </div>
      </Slide>

      <Slide title="Next steps">
        <List
          items={[
            "R package for describing 'ocap' functions and compiling them into valid Typescript definitions",
            <p key="px">
              React library for &lsquo;hooks&rsquo; (e.g.,{" "}
              <code>useRserve()</code>)
            </p>,
            <div key="py">
              <p>Some (initial) widgets for common outputs:</p>
              <p>tables, plots, etc.</p>
            </div>,
          ]}
        />

        <div>
          Longer term:
          <List items={["Rebuild iNZight using the new infrastructure"]} />
        </div>
      </Slide>

      {/* thank you slide that mimics title slide */}
      <Slide>
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-5xl font-bold tracking-tight text-red-600">
            Thank you!
          </h1>

          <h2 className="mt-12 text-center text-xl">
            <strong>Introducing rserve-ts</strong>
            <br />
            <em className="text-lg">
              A modernised library for R-to-web communication
            </em>
          </h2>

          <div className="mt-4 text-center">
            <p className="font-bold text-red-500">Tom Elliott</p>
            <p className="text-sm">https://github.com/tmelliott</p>
            <p className="text-sm">https://inzight.co.nz/team/tom</p>
          </div>

          <div
            className={`relative mt-12 w-full`}
            style={{
              height: size(12),
            }}
          >
            <Image
              src="/ial-logo.png"
              alt=""
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
      </Slide>
    </>
  );
}

const Rcode =
  "# app.R \n\
library(Rserve) \n\
app <- ocap(function() { \n\
    list( \n\
        version = ocap(function() R.version.string), \n\
        histSample = ocap(function(n) { \n\
            h <- hist( \n\
                rnorm(n, ifelse(rbinom(n, 1, 0.2), 3, -1)), \n\
                breaks = seq(-10, 10, by = 1), \n\
                plot = FALSE \n\
            ) \n\
            list(counts = h$counts, breaks = h$breaks) \n\
        }) \n\
    ) \n\
}) \n\
";

const appSchema =
  '// app.ts \n\
import { z } from "zod"; \n\
import { Robj } from "rserve-ts"; \n\
 \n\
const appFuns = { \n\
  version: Robj.ocap([], Robj.character(1)), \n\
  histSample: Robj.ocap( \n\
    [z.number()], \n\
    Robj.list({ \n\
      breaks: Robj.numeric(0), \n\
      counts: Robj.integer(0), \n\
    }), \n\
  ), \n\
};';

// const appCode =
//   '// app.ts \n\
// import R from \'rserve-ts\'; \n\
// import { appSchema } from \'./app\'; \n\
// \n\
// (async () => { \n\
//   const s = await R.connect({ host: "ws://localhost:8181" }); \n\
//   const app = await s.ocap(appSchema); \n\
// \n\
//   const num: number = 5; \n\
//   const x = await app.foo(num); // x: number \n\
//   // await app.foo("hello"); // ts-error \n\
// \n\
//   const y = app.bar("hello"); // y: number | \n\
//   //   (Int32Array & { r_type: "int_array"; }; \n\
//   if (y instanceof Int32Array) { \n\
//     y.map((i) => console.log(i - 1)); // [0, 1, 2, 3, 4] \n\
//   } \n\
// })();';
