import { IFiberNodeType } from "./types";
import { nextUnitOfWork } from "./wookLoop";

// 这个地方ts里面的dom类型还不是很清楚。
export const createDom = (fiber: IFiberNodeType) => {
  const dom: Node =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode(fiber.props.nodeValue.toString())
      : document.createElement(fiber.type);
  const isProperty = (key: string) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      // fix me
      (dom as any)[name] = fiber.props[name];
    });
  if (fiber.type === "TEXT_ELEMENT") {
    dom.appendChild(dom);
    return dom;
  }
  fiber.props.children.forEach((child) => render(child, dom));
  return dom;
};

export const render: any = (element: IFiberNodeType, container: Node) => {
  nextUnitOfWork.current = {
    dom: container,
    props: {
      children: [element],
    },
  };
};
