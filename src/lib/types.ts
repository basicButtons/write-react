export type reactElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "a";
type TextFiber = {
  type: "TEXT_ELEMENT";
  parent?: IFiberNodeType;
  dom?: Node;
  child?: IFiberNodeType;
  sibling?: IFiberNodeType;
  effectTag?: "UPDATE" | "PLACEMENT" | "DELETION";
  alternate?: IFiberNodeType;
  props: {
    nodeValue?: Exclude<IChildType, IFiberNodeType>;
    children: IFiberNodeType[];
    [property: string]: any;
  };
};

export type EffectHookType = {
  tag: "effect";
  effect?: () => () => any;
  cancel?: () => any;
  deps: any[];
};
export type actionType<T> = T | ((arg: T) => T);
export type actionOrStateList<T> = actionType<T>[];
export type StateHookType<T> = {
  tag?: "state";
  state: T;
  queue: actionOrStateList<T>;
};

export type HookType = EffectHookType | StateHookType<any>;

export type FunctionFiber = {
  type: Function;
  parent?: IFiberNodeType;
  dom?: Node;
  child?: IFiberNodeType;
  sibling?: IFiberNodeType;
  effectTag?: "UPDATE" | "PLACEMENT" | "DELETION";
  alternate?: IFiberNodeType;
  hooks?: HookType[];
  props: {
    nodeValue?: Exclude<IChildType, IFiberNodeType>;
    children: IFiberNodeType[];
    [property: string]: any;
  };
};
export type NodeFiber = {
  type: reactElementType;
  parent?: IFiberNodeType;
  dom?: Node;
  child?: IFiberNodeType;
  sibling?: IFiberNodeType;
  alternate?: IFiberNodeType;
  effectTag?: "UPDATE" | "PLACEMENT" | "DELETION";
  props: {
    [property: string]: any;
    children: IFiberNodeType[];
  };
};
export type IFiberNodeType = TextFiber | NodeFiber | FunctionFiber;

export type IChildType = IFiberNodeType | string | number;

export type createTextElementType = (
  text: Exclude<IChildType, IFiberNodeType>
) => IFiberNodeType;
