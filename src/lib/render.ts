import { IFiberNodeType } from "./types";
import { currentRoot, nextUnitOfWork } from "./workStore";
import { WipRoot } from "./workStore";

// 这个地方ts里面的dom类型还不是很清楚。
export const createDom = (fiber: IFiberNodeType) => {
  const dom: Node =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode(fiber.props.nodeValue!.toString())
      : document.createElement(fiber.type);
  const isProperty = (key: string) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      // fix me
      (dom as any)[name] = fiber.props[name];
    });
  return dom;
};

export const render: any = (element: IFiberNodeType, container: Node) => {
  // render 只有在 在每一次re-render中只执行一次，在这一次中我们去绑定 alternate 这个属性。
  WipRoot.current = {
    type: "div",
    dom: container,
    // 这里保存着 目前在 dom 上已经 commit 上去的 root，其中这个 alternate 的属性来自于 上次 commit 之后保存的 value。
    alternate: currentRoot.current,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork.current = WipRoot.current;
};
