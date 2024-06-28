import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { QuestionTypeNodeType } from '../types';
import { LayoutTypesNode } from '../LayoutTypesNode';
import messageIcon from '../../../../../../../../../../public/icons/chatbot/message-text.svg';
import messageQuestionBox from '../../../../../../../../../../public/icons/scenario/box.svg';
import Image from 'next/image';
import { ButtonNode } from '../ButtonNode';
import { generateId } from '@/utils/generateId';
import { AddButtonNode, AddTextNode, ImageNode } from './componentsNodes';
import { useStoreApi } from 'reactflow';
import { NodeDataType, useSenarioCreate } from '@/zustand_store';

function QuestionButtonTypeNode({ data, isConnectable }: QuestionTypeNodeType) {
  const { setNodesData, setScenarioItems, _id, deleteScenarioItem } =
    useSenarioCreate();
  const initializeFirstNode = (): NodeDataType => {
    return {
      id: data.id,
      label: '',
      type: 'button',
      parents: [],
      children: [],
      scenario_id: _id,
    };
  };
  const nodesData = useSenarioCreate((state) => state.nodesData);
  const [content, setContent] = useState<NodeDataType[]>([
    initializeFirstNode(),
  ]);
  const [imageDel, setImageDel] = useState<boolean>(false);
  function deleteItemById(
    items: NodeDataType[],
    idToDelete: string
  ): NodeDataType[] {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    return updatedItems;
  }
  function deleteItemContent(id: string) {
    setContent((prevContent) => prevContent.filter((node) => node.id !== id));
    deleteScenarioItem!(id);
  }
  function addTextNode() {
    const newText: NodeDataType = {
      id: generateId(),
      label: '',
      type: 'text',
      parents: [],
      children: [],
      scenario_id: _id,
    };
    setContent([...content, newText]);
  }
  function addImage() {
    const newText: NodeDataType = {
      id: generateId(),
      label: '',
      type: 'image',
      parents: [],
      children: [],
      scenario_id: _id,
    };
    setContent([...content, newText]);
  }
  function addButton() {
    const currentId = generateId();
    const newButton: NodeDataType = {
      id: currentId,
      label: '',
      type: 'text',
      parents: [data.id],
      children: [],
      scenario_id: _id,
    };
    const tampWithout = content.filter((node) => node.id !== data.id);
    let parent = content.find((item) => item.id === data.id);
    if (parent) {
      parent.children.push(currentId);

      setContent([parent, ...tampWithout, newButton]);
    }
  }
  function setContentItem(id: string, value: string) {
    setContent((prevContent) =>
      prevContent.map((node) =>
        node.id === id ? { ...node, label: value } : node
      )
    );
  }

  const store = useStoreApi();
  const { getNodes, setNodes, edges } = store.getState();
  function duplicateNode() {
    const nodes = getNodes();
    let nodeToduplicate = nodes.find((item) => item.id === data?.id);

    if (nodeToduplicate) {
      const idNow = generateId();
      const nodeToduplicateDuplicate = {
        ...nodeToduplicate,
        position: {
          x: nodeToduplicate.position.x + 300,
          y: nodeToduplicate.position.y + 50,
        },
        id: idNow,
        data: {
          ...nodeToduplicate.data,
          content: content,
          id: idNow,
        },
      };
      data?.setNodes([...nodes, nodeToduplicateDuplicate]);
    }
  }
  function deleteNode() {
    const nodes = getNodes();
    content.forEach((item) => deleteScenarioItem!(item.id));
    let nodeToduplicate = nodes.filter((item) => item.id !== data?.id);
    data?.setNodes([...nodeToduplicate]);
  }
  function updateValueContent(id: string, value: string) {
    // setContent((cont) => {
    //   let newTable: NodeDataType[] = [];
    //   let content = cont.forEach((cnt) => {
    //     if (cnt.id === id) {
    //       return newTable.push({ ...cnt, value: value });
    //     } else {
    //       return newTable.push(cnt);
    //     }
    //   });
    //   return newTable;
    // });
  }
  function updateValueContentLink(id: string, value?: string) {
    // setContent((cont) => {
    //   let newTable: NodeDataType[] = [];
    //   let content = cont.forEach((cnt) => {
    //     if (cnt.id === id) {
    //       if (value === undefined) {
    //         return newTable.push({
    //           id: cnt.id,
    //           value: cnt.value,
    //           type: cnt.type,
    //         });
    //       }
    //       return newTable.push({ ...cnt, link: value });
    //     } else {
    //       return newTable.push(cnt);
    //     }
    //   });
    //   return newTable;
    // });
    // !value && setImageDel(!imageDel);
  }

  useEffect(() => {
    setScenarioItems!(content);
  }, [content]);
  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <LayoutTypesNode
        icon={<Image src={messageQuestionBox} alt="" width={16} height={16} />}
        title="Question - Button"
        color="bg-error-default-light"
        data={data}
        duplicate={duplicateNode}
        deleteNode={deleteNode}
      >
        <div className=" bg-mainDark w-full p-2 ">
          <div className=" flex flex-col gap-1 mb-2">
            {content.map((item, index) => {
              if (item.id === data.id)
                return (
                  <AddTextNode
                    key={index}
                    id={data.id}
                    deletefc={deleteItemContent}
                    setContent={setContentItem}
                    defaultValue={item.label}
                  />
                );
              else if (item.type === 'text') {
                return (
                  <AddButtonNode
                    key={index}
                    id={item.id}
                    deletefc={deleteItemContent}
                    setContent={setContentItem}
                    defaultValue={item.label}
                  />
                );
              } else if (item.type === 'image') {
                return (
                  <ImageNode
                    key={index}
                    id={item.id}
                    deletefc={deleteItemContent}
                    setContent={updateValueContentLink}
                    defaultValue={item.label}
                  />
                );
              }
              return;
            })}
          </div>
          <div className=" w-full flex flex-wrap  gap-x-1 gap-y-2">
            <ButtonNode disabled titre="Image" fc={addImage} />

            <ButtonNode
              titre="Add button"
              fc={addButton}
              conditionDisable={content.length > 3}
              disabled={content.length > 3}
              errorText="Max buttons reached"
            />

            {/* <ButtonNode title="Audio" fc={addAudioNode} />
            <ButtonNode title="video" fc={addVideoNode} />
            <ButtonNode title="Document" fc={addDocumentNode} />
            <ButtonNode title="Gift" fc={addGiftNode} /> */}
          </div>
        </div>
      </LayoutTypesNode>
    </div>
  );
}

export { QuestionButtonTypeNode };
