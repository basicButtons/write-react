import {
  actionOrStateList,
  actionType,
  FunctionFiber,
  StateHookType,
} from "../types";
import {
  currentRoot,
  deletions,
  hookIndex,
  nextUnitOfWork,
  wipFiber,
  WipRoot,
} from "../workStore";

export function useState<T>(initial: T): [T, (arg: actionType<T>) => void] {
  const oldHook: StateHookType<T> = (wipFiber.current!.alternate &&
    (wipFiber.current!.alternate as FunctionFiber).hooks &&
    (wipFiber.current!.alternate as FunctionFiber).hooks?.[
      hookIndex.current
    ]) as StateHookType<T>;
  const hook: StateHookType<T> = {
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

  const setState = (action: actionType<T>) => {
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
