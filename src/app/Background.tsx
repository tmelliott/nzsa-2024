"use client";

import { useSearchParams } from "next/navigation";

const Background = () => {
  const params = useSearchParams();
  const bg = params.get("bg");

  if (bg === "black") return <></>;

  return (
    <div className="absolute h-full w-full bg-[url('/ial-bg.png')] bg-contain bg-bottom bg-no-repeat"></div>
  );
};

export default Background;
