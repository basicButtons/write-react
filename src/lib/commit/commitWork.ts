import { IFiberNodeType } from "../types";

// 在执行完所有的 rerender 之后，我们会去进行 commit 工作，但是在这个阶段，我们还是同步的过程，该过程同样也是 dfs 的过程。
export function commitWork(fiber: IFiberNodeType | undefined) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent!.dom!;
  handleEffectTags(fiber, domParent);
  domParent!.appendChild(fiber.dom!);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function handleEffectTags(fiber: IFiberNodeType, domParent: Node) {
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom!);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate!.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom!);
  }
}

const isProperty = (key: string) => key !== "children";
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);

function updateDom(
  dom: Node,
  prevProps: IFiberNodeType["props"],
  nextProps: IFiberNodeType["props"]
) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}
