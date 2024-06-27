import { Edge, Node } from 'reactflow';
export type NodeDataType = {
  id: string;
  value?: any;
  type?: 'response' | 'question';
  link?: string;
};
export type SenarioType = {
  nameSenario: string;
  nodesData: NodeDataType[];
  edgesData: NodeDataType[];
  keywords?: string[];
  setAddNodesData?: (nds: NodeDataType) => void;
  setNodesData?: (nds: NodeDataType[]) => void;
  setEdgesData?: (nds: Edge[]) => void;
  setNameSenario: (nds: string) => void;
  setKeywordsSenario?: (nds: string[]) => void;
  reset?: () => void;
};
export type LoaderDataType = {
  isLoading: boolean;
  setIsLoading: (nds: boolean) => void;
};
export type NomberConversationDataType = {
  nb: number;
  setNb: (nds: number) => void;
};
