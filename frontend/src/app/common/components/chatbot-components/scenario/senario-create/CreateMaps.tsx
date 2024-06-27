'use client';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Node,
  XYPosition,
  updateEdge,
  Edge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SideBar } from './SideBar/SideBar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MessageTypeNode,
  QuestionTypeNode,
  ConditionalTypeNode,
} from './components/TypesNodes';
import { generateId } from '@/utils/generateId';
import { ButtonSave } from './components';
import { useSenarioCreate } from '@/zustand_store';
import Image from 'next/image';
import arrowIcon from '../../../../../../../public/icons/chatbot/arrow-left.svg';
import { useQuery } from '@tanstack/react-query';
import { SenarioService } from '@/services';
import { MainModel } from './components/ButtonSave/types';
import { GetSenario } from '@/services';
import LoaderSpinner from '@/app/common/ui/loaderSpinner';

const nodeTypes = {
  messageNode: MessageTypeNode,
  questionNode: QuestionTypeNode,
  conditionalNode: ConditionalTypeNode,
};
interface CreateMapsProps {
  id?: string;
}
type NodeDataType = {
  id: string;
  value: any;
  type?: 'response' | 'question';
  link?: string;
};
function CreateMaps(props: CreateMapsProps) {
  const edgeUpdateSuccessful = useRef(true);
  const getId = () => generateId();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const { setNameSenario, setKeywordsSenario } = useSenarioCreate();
  const { setNodesData, setAddNodesData } = useSenarioCreate();
  const nameSenario = useSenarioCreate((state) => state.nameSenario);
  // for update
  const [scenarioGetted, setScenarioGetted] = useState<GetSenario>();
  const [loading, setLoading] = useState(false);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
        return addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.Arrow,
              width: 20,
              height: 20,
              color: '#C3C7CB',
            },
            style: {
              strokeWidth: 2,
              stroke: '#C3C7CB',
            },
          },
          eds
        );
      }),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position: XYPosition | undefined =
        reactFlowInstance?.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
      const idNode = getId();
      if (position) {
        const newNode: Node = {
          id: idNode,
          type,
          position,
          data: {
            label: `${type} node`,
            id: idNode,
            setNodes: setNodes,
            content: [],
          },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance]
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);
  async function getOneSenario(id: string | undefined) {
    setLoading(true);
    const response = await new SenarioService().getSenarioById(id);
    if (response.status === 200) {
      setLoading(false);
      return response;
    } else {
      setLoading(false);
      return null;
    }
  }

  // for update
  function loadScenario(mainDescription: MainModel[]): {
    nodeData: NodeDataType[];
    edges: Edge[];
  } {
    let nodesData = new Set();
    let edges = new Set();

    const traverseEdges = (isQuestion: boolean, parentNode: MainModel) => {
      // start create a node data
      const parentNodeData: NodeDataType = {
        id: parentNode?.id ? parentNode?.id : generateId(),
        value: parentNode.label,
        type: isQuestion ? 'question' : 'response',
        link: parentNode.link ? parentNode.link : undefined,
      };
      nodesData.add(parentNodeData);
      if (parentNode?.questions) {
        for (const child of parentNode.questions) {
          edges.add({
            id: generateId(),
            markerEnd: {
              type: 'arrow',
              width: 20,
              height: 20,
              color: '#C3C7CB',
            },
            source: parentNode.id,
            sourceHandle: null,
            style: { strokeWidth: 2, stroke: '#C3C7CB' },
            target: child.id,
            targetHandle: null,
          });
          traverseEdges(true, child);
        }
      }
      if (parentNode?.responses) {
        for (const child of parentNode.responses) {
          edges.add({
            id: generateId(),
            markerEnd: {
              type: 'arrow',
              width: 20,
              height: 20,
              color: '#C3C7CB',
            },
            source: parentNode.id,
            sourceHandle: null,
            style: { strokeWidth: 2, stroke: '#C3C7CB' },
            target: child.id,
            targetHandle: null,
          });
          traverseEdges(false, child);
        }
      }
    };
    traverseEdges(true, mainDescription[0]);
    const finalNodeData = Array.from(nodesData) as NodeDataType[];
    const finalEdge = Array.from(edges) as Edge[];
    return { nodeData: finalNodeData, edges: finalEdge };
  }
  /**
   * Funtion to find a start node
   * @param edges
   * @returns
   */
  function findStartNode(edges: Edge[]) {
    const targetNodes = new Set(edges.map((edge: Edge) => edge.target));
    for (const edge of edges) {
      if (!targetNodes.has(edge.source)) {
        return edge.source;
      }
    }
    return undefined;
  }
  /**
   *  function to display none on canvas
   * @param nodeData
   * @param edges
   * @returns Node[]
   */
  function displayNodeOnCanvas(
    nodeData: NodeDataType[],
    edges: Edge[]
  ): Node[] {
    let nodes = [];
    const visitedNodes = new Set<string>(); // Ensemble pour stocker les identifiants des nœuds visités

    const traverseEdges = (nodeParent: Node) => {
      const edgesFromNode = edges.filter(
        (edge) => edge.source === nodeParent.id
      );

      const localX = nodeParent.position.x + 500;
      let localY = nodeParent.position.y;

      for (let index = 0; index < edgesFromNode.length; index++) {
        const edge = edgesFromNode[index];
        const currentNodeData = nodeData.find(
          (item) => item.id === edge.target
        );
        if (
          currentNodeData &&
          currentNodeData.id &&
          !visitedNodes.has(currentNodeData.id)
        ) {
          visitedNodes.add(currentNodeData.id); // Ajouter le nœud à l'ensemble des nœuds visités
          const newNode: Node = {
            id: currentNodeData.id,
            type:
              currentNodeData.type === 'response'
                ? 'messageNode'
                : 'questionNode',
            position: {
              x: localX,
              y: localY + 400 * index,
            },
            data: {
              label: `messageNode node`,
              id: currentNodeData.id,
              setNodes: setNodes,
              content: [],
              defaulUpdate: currentNodeData.value,
            },
          };

          nodes.push(newNode);
          traverseEdges(newNode);
          localY += 100;
        }
      }
    };

    const nodeIdRacine = findStartNode(edges);
    const rootNodeData = nodeData.find((item) => item.id === nodeIdRacine);
    if (rootNodeData && rootNodeData.id) {
      visitedNodes.add(rootNodeData.id); // Ajouter le nœud racine à l'ensemble des nœuds visités
      const firstNode: Node = {
        id: rootNodeData.id,
        type: rootNodeData.type === 'response' ? 'messageNode' : 'questionNode',
        position: {
          x: 200,
          y: 100,
        },
        data: {
          label: `messageNode node`,
          id: rootNodeData.id,
          setNodes: setNodes,
          content: [],
        },
      };
      nodes.push(firstNode);
      traverseEdges(firstNode);
    }
    return nodes;
  }

  async function mainFn() {
    if (props.id) {
      const reponse = await getOneSenario(props.id);
      if (reponse) {
        setScenarioGetted(reponse.data);
        let nodesDataAndEdges = loadScenario(reponse.data?.description);
        setNameSenario(reponse.data.title);
        setKeywordsSenario?.(reponse.data.keywords ?? []);
        setNodesData!(nodesDataAndEdges?.nodeData);
        setNodes(
          displayNodeOnCanvas(
            nodesDataAndEdges.nodeData,
            nodesDataAndEdges.edges
          )
        );

        setEdges(nodesDataAndEdges.edges);
      }
    }
  }
  useEffect(() => {
    if (props.id) {
      mainFn();
    }
  }, []);
  return loading ? (
    <LoaderSpinner />
  ) : (
    <div className=" relative " style={{ height: '100%', width: '100%' }}>
      <div className=" absolute right-5 top-5 z-20">
        <ButtonSave
          updateOrCreate={props.id}
          cacheUpdate={scenarioGetted}
          edges={edges}
        />
      </div>

      <SideBar updateOrCreate={props.id} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        // defaultViewport={defaultViewport}
        maxZoom={1.5}
      >
        <Background />

        <Controls position="bottom-right" className=" flex gap-1 mr-20" />
      </ReactFlow>
    </div>
  );
}

export default CreateMaps;
