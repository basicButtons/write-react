import { Didact } from "./lib/index";
const { render, useState } = Didact;

/** @jsx Didact.createElement */
function App(props: any) {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <h1>Hi {count}</h1>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        click + 1
      </button>
    </div>
  );
}

const element = <App name="foo" />;
console.log("element : ", element);
const container = document.getElementById("root")!;
render(element, container);
