const Slide = ({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`h-screen w-full snap-start snap-always p-4`}>
      <div className="isolate mx-auto flex aspect-[4/3] max-h-full max-w-full flex-col gap-6 rounded-lg bg-black/30 p-8 text-xl shadow shadow-black ring-1 ring-black/5 backdrop-blur-lg">
        {title && (
          <h1 className="text-3xl font-bold tracking-tight text-red-500">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
};

export default Slide;
