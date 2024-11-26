const x = await app.foo(num);
await app.foo("hello"); // ts-error

const y = app.bar("hello");
if (y instanceof Int32Array) {
  Array.from(y).map((i) => {
    console.log(i - 1);
  });
}
