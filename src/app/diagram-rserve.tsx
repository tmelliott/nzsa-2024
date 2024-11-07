import Image from "next/image";

export const RserveDiagram = () => {
  return (
    <div className="mx-auto flex h-36 w-3/4 items-center justify-center gap-4">
      <div className="relative size-24">
        <Image
          src="/jslogo.png"
          alt="JavaScript"
          fill={true}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-center gap-12">
        <Arrow direction="right" />
        <Arrow direction="left" />
      </div>
      <div className="relative size-24">
        <Image
          src="/rlogo.png"
          alt="Rserve"
          fill={true}
          className="object-contain"
        />
      </div>
    </div>
  );
};

const Arrow = ({
  direction,
}: {
  direction: "right" | "left" | "up" | "down";
}) => {
  return (
    <div className="relative w-24 border-2 border-b border-white">
      <div
        className={`absolute size-4 border-r-2 border-t-2 border-white ${
          direction === "right" &&
          "right-0 origin-top-right translate-x-1 rotate-45 -skew-x-12 -skew-y-12"
        } ${
          direction === "left" &&
          "-left-1 origin-top-right -translate-x-full -rotate-[135deg] -skew-x-12 -skew-y-12"
        }`}
      ></div>
    </div>
  );
};
