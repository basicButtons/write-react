import { EffectHookType, FunctionFiber } from "../types";
import { hookIndex, wipFiber } from "../workStore";

export function cancelEffects(fiber: FunctionFiber) {
  if (fiber.hooks) {
    fiber.hooks
      .filter((hook) => hook.tag === "effect" && hook.cancel)
      .forEach((effectHook) => {
        (effectHook as EffectHookType).cancel!();
      });
  }
}

export function runEffects(fiber: FunctionFiber) {
  if (fiber.hooks) {
    fiber.hooks
      .filter((hook) => hook.tag === "effect" && hook.effect)
      .forEach((effectHook) => {
        (effectHook as EffectHookType).cancel = (effectHook as EffectHookType)
          .effect!();
      });
  }
}

const hasDepsChanged = (
  prevDeps: any[] | undefined,
  nextDeps: any[] | undefined
) =>
  !prevDeps ||
  !nextDeps ||
  prevDeps.length !== nextDeps.length ||
  prevDeps.some((dep: string, index: number) => dep !== nextDeps[index]);

export function useEffect(effect: () => () => any, deps: any[]) {
  const oldHook =
    wipFiber.current!.alternate &&
    (wipFiber.current!.alternate as FunctionFiber).hooks &&
    (wipFiber.current!.alternate! as FunctionFiber).hooks![hookIndex.current];

  const hasChanged = hasDepsChanged(
    oldHook ? (oldHook as EffectHookType).deps! : undefined,
    deps
  );

  const hook: EffectHookType = {
    tag: "effect",
    effect: hasChanged ? effect : undefined,
    cancel: hasChanged
      ? oldHook && (oldHook as EffectHookType).cancel
      : undefined,
    deps,
  };

  (wipFiber.current as FunctionFiber)!.hooks!.push(hook);
  hookIndex.current++;
}
