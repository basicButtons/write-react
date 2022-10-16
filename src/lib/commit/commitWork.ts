import { IFiberNodeType } from "../types";

// 在执行完所有的 rerender 之后，我们会去进行 commit 工作，但是在这个阶段，我们还是同步的过程，该过程同样也是 dfs 的过程。
export function commitWork(fiber: IFiberNodeType | undefined) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent!.dom;
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

function updateDom(
  dom: Node,
  prevProps: IFiberNodeType["props"],
  nextProps: IFiberNodeType["props"]
) {
  // TODO
}
