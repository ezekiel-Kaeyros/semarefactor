import React from 'react';
import { Node } from 'reactflow';

export type ContentNodeType = {
  id: string;
  component: React.ReactNode;
  value?: string;
};
export type dataNodeType = {
  label: string;
  id: string;
  setNodes: (nds: Node[]) => void;
  content: ContentNodeType[];
  defaultValue?: string;
};
export type MessageTypeNodeType = {
  data: dataNodeType;
  isConnectable?: boolean;
};
export type QuestionTypeNodeType = MessageTypeNodeType & {};
export type LayoutNodeType = {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  color?: string;
  data?: dataNodeType;
  duplicate?: () => void;
  deleteNode?: () => void;
};
export type ButtonNodeType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  fc: () => void;
};

export type TextNodeType = {
  id: string;
  deletefc: any;
};

export type ImageNodeType = TextNodeType & {};
export type AudioNodeType = TextNodeType & {};
