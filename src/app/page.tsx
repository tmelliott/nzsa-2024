import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";

import Demo from "./components/Demo";
import { RserveDiagram } from "./components/RserveDiagram";
import { type Metadata } from "next";
import Slide from "./components/Slide";
import List from "./components/List";
import { size } from "./lib/helpers";
import TsDemo from "./components/TsDemo";

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

      <Slide title="">
        <div className="relative h-full">
          <Image
            src="/rip_inzight.jpg"
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
                priority
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
                priority
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

      <Slide title="Live demo &hellip; 🤞🤞🤞">
        <div className="flex-1">
          <Demo />
        </div>
      </Slide>

      <Slide>
        <TsDemo />
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
