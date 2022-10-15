export type reactElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "a";

export type IReactNodeType = {
  type: reactElementType | "TEXT_ELEMENT";
  props: any;
};

export type IChildType = IReactNodeType | string | number;


export type createTextElementType = (
  text: Exclude<IChildType, IReactNodeType>
) => IReactNodeType;
