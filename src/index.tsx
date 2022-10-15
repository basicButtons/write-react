import { Didact, IFiberNodeType } from "./lib/index";
const { render } = Didact;
/** @jsx Didact.createElement */
const element: IFiberNodeType = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
console.log(element);
const container = document.getElementById("root")!;
render(element, container);
