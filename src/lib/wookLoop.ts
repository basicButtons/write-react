import { commitRoot } from "./commit";
import { performUnitOfWork } from "./performUnitOfWork";
import { nextUnitOfWork, WipRoot } from "./workStore";

export function workLoop(deadline: any) {
  let shouldYield: boolean = false;
  while (nextUnitOfWork.current && !shouldYield) {
    nextUnitOfWork.current = performUnitOfWork(nextUnitOfWork.current);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork.current && WipRoot.current) {
    commitRoot();
  }
  // 上面是 render 的过程，我们建立的 fiber tree 下面我会把 fiber tree commit 到 真实的 dom 上去
  requestIdleCallback(workLoop);
}
