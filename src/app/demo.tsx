import R from "rserve-ts";

export default async function Demo() {
  //   const { is_running } = await R.create({
  //     host: "ws://localhost:8181",
  //   });

  return (
    <div className="flex h-full items-center justify-center rounded bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-lg">
      RSERVE DEMO
    </div>
  );
}
