import React from 'react';

export type TextNodeType = {
  id: string;
  deletefc: any;
  setContent?: (d: string, value: string) => void;
  defaultValue?: string;
};

export type ImageNodeType = TextNodeType & {};
export type AudioNodeType = TextNodeType & {};
