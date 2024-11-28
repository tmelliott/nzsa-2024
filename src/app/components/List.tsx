const List = ({ items }: { items: React.ReactNode[] }) => {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((x, i) => (
        <li className="grid grid-cols-[20px_1fr] items-start gap-4" key={i}>
          <div className="h-[1.5em]">
            <Arrow />
          </div>
          {x}
        </li>
      ))}
    </ul>
  );
};

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="h-full w-full fill-red-400"
  >
    <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
  </svg>
);

export default List;
