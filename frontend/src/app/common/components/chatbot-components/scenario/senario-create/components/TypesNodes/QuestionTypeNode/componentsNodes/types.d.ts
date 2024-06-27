export type AddTextNodeType = {
  id: string;
  deletefc: any;
  setContent?: (d: string, value: string) => void;
  defaultValue?: string;
};
export type ImageNodeType = AddTextNodeType & {
  setContent?: (d: string, value?: string) => void;
};
