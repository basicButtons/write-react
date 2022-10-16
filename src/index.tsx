import { Didact } from "./lib/index";
const { render } = Didact;

/** @jsx Didact.createElement */
function App(props: any) {
  return <h1>Hi {props.name}</h1>;
}

const element = <App name="foo" />;
console.log("element : ", element);
const container = document.getElementById("root")!;
render(element, container);
