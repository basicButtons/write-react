import {
  reactElementType,
  IFiberNodeType,
  IChildType,
  createTextElementType,
} from "./types";
export * from "./types";

export const createTextElement: createTextElementType = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

export const createElement: (
  type: reactElementType,
  props?: any,
  ...children: IChildType[]
) => IFiberNodeType = (type, props?: any, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
};
