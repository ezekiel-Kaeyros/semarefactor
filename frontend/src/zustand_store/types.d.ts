import { Edge, Node } from 'reactflow';

// export type NodeDataType = {
//   id: string;
//   value?: any;
//   type?: 'response' | 'question';
//   link?: string;
// };
export type NodeDataType = {
  id: string;
  label?: string;
  url?: string;
  template_scenario_id?: string[];
  type: 'button' | 'text' | 'list' | 'image';
  parents: string[];
  children: string[];
  childrenDetails?: NodeDataType[];
  scenario_id: string;
};
export type SenarioType = {
  title: string;
  type: string;
  credential_id: string;
  active: boolean;
  scenario_items: NodeDataType[];
  _id: string;

  nameSenario: string;
  nodesData: NodeDataType[];
  edgesData: NodeDataType[];
  keywords?: string[];
  deleteScenarioItem?: (id: string) => void;
  setScenarioItems?: (nds: NodeDataType[]) => void;
  setAddNodesData?: (nds: NodeDataType) => void;
  setNodesData?: (nds: NodeDataType[]) => void;
  setEdgesData?: (nds: Edge[]) => void;
  setNameSenario: (nds: string) => void;
  setKeywordsSenario?: (nds: string[]) => void;
  setInitialistionSenario?: (nds: {
    title: string;
    type: string;
    credential_id: string;
    active: boolean;
    _id: string;
    keywords: string[];
  }) => void;
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
