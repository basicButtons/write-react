import {
  reactElementType,
  IReactNodeType,
  IChildType,
  createTextElementType,
} from "./types";

const createTextElement: createTextElementType = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

const createElement: (
  type: reactElementType,
  props?: any,
  ...children: IChildType[]
) => IReactNodeType = (type, props, ...children) => {
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

export const Didact = {
  createElement,
};

// /** @jsx Didact.createElement */
// export const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );

// console.log(element);
