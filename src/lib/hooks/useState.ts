import { FunctionFiber } from "../types";
import {
  currentRoot,
  deletions,
  hookIndex,
  nextUnitOfWork,
  wipFiber,
  WipRoot,
} from "../workStore";

type actionType<T> = (arg: T) => T;
type actionOrStateList<T> = actionType<T>[] | T[];
type HookType<T> = { state: T; queue: actionOrStateList<T> };

export function useState<T>(initial: T): [T, (newState: T) => void] {
  const oldHook: HookType<T> =
    wipFiber.current!.alternate &&
    (wipFiber.current!.alternate as FunctionFiber).hooks &&
    (wipFiber.current!.alternate as FunctionFiber).hooks?.[hookIndex.current];
  const hook: HookType<T> = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions: actionOrStateList<T> = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    if (action instanceof Function) {
      hook.state = action(hook.state);
    } else {
      hook.state = action;
    }
  });

  const setState = (action: any) => {
    hook.queue.push(action);
    // 给 Work in Process 赋给一个 fiber节点，然后从这个fiber下面开始 reconcileChildren
    WipRoot.current = {
      dom: currentRoot.current!.dom,
      props: currentRoot.current!.props,
      alternate: currentRoot.current,
      type: currentRoot.current!.type,
    };
    nextUnitOfWork.current = WipRoot.current;
    deletions.current = [];
  };
  wipFiber.current!.hooks?.push(hook);
  hookIndex.current++;
  return [hook.state, setState];
}
