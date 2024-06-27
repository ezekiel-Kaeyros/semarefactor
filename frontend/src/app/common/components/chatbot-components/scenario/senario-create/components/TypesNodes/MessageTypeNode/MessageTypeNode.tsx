import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { ContentNodeType, MessageTypeNodeType } from '../types';
import { LayoutTypesNode } from '../LayoutTypesNode';
import messageIcon from '../../../../../../../../../../public/icons/chatbot/message-text.svg';
import Image from 'next/image';
import { ButtonNode } from '../ButtonNode';
import {} from './componentsNodes/TextNode';
import { generateId } from '@/utils/generateId';
import {
  GiftNode,
  TextNode,
  DocumentNode,
  VideoNode,
  AudioNode,
} from './componentsNodes';
import { useStoreApi } from 'reactflow';
import { NodeDataType, useSenarioCreate } from '@/zustand_store';

function MessageTypeNode({ data, isConnectable }: MessageTypeNodeType) {
  // const [content, setContent] = useState<ContentNodeType[]>(data.content);
  const { setNodesData, setAddNodesData } = useSenarioCreate();
  const nodesData = useSenarioCreate((state) => state.nodesData);
  const [content, setContent] = useState<NodeDataType[]>(
    nodesData.filter((item) => item.id === data.id)
  );
  function deleteItemById(
    items: NodeDataType[],
    idToDelete: string
  ): NodeDataType[] {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    return updatedItems;
  }
  // TODO: add delete on store for create and delete
  function deleteItemContent(id: string) {
    const tampon = deleteItemById(content, id);
    setNodesData!(nodesData.filter((item) => item.id != id));
    setContent(tampon);
  }
  function updateValueContent(id: string, value: string) {
    setContent((cont) => {
      let newTable: NodeDataType[] = [];
      let content = cont.forEach((cnt) => {
        if (cnt.id === id) {
          return newTable.push({ ...cnt, value: value });
        } else {
          return newTable.push(cnt);
        }
      });

      return newTable;
    });
  }
  function addTextNode(defaultValue?: string) {
    // const id = generateId();
    setContent([
      ...content,
      {
        id: data?.id,
        value: '',
        type: 'response',
      },
    ]);
    setAddNodesData!({
      id: data?.id,
      value: '',
      type: 'response',
    });
  }
  /**
   *
   */
  function addImageNode() {
    // const id = generateId();
    // setContent([
    //   ...content,
    //   {
    //     id: id,
    //     component: (
    //       <ImageNode
    //         id={id}
    //         deletefc={deleteItemContent}
    //         setContent={updateValueContent}
    //       />
    //     ),
    //   },
    // ]);
  }
  /**
   *
   */
  function addAudioNode() {
    const id = generateId();
    // setContent([
    //   ...content,
    //   {
    //     id: id,
    //     component: (
    //       <AudioNode
    //         id={id}
    //         deletefc={deleteItemContent}
    //         setContent={updateValueContent}
    //       />
    //     ),
    //   },
    // ]);
  }
  /**
   *
   */
  function addVideoNode() {
    const id = generateId();
    // setContent([
    //   ...content,
    //   {
    //     id: id,
    //     component: (
    //       <VideoNode
    //         id={id}
    //         deletefc={deleteItemContent}
    //         setContent={updateValueContent}
    //       />
    //     ),
    //   },
    // ]);
  }
  /**
   *
   */
  function addDocumentNode() {
    const id = generateId();
    // setContent([
    //   ...content,
    //   {
    //     id: id,
    //     component: (
    //       <DocumentNode
    //         id={id}
    //         deletefc={deleteItemContent}
    //         setContent={updateValueContent}
    //       />
    //     ),
    //   },
    // ]);
  }
  /**
   *
   */
  function addGiftNode() {
    // const id = generateId();
    // setContent([
    //   ...content,
    //   {
    //     id: id,
    //     // TODO:enable setContent for all media becaus is only for text which is available
    //     component: (
    //       <GiftNode
    //         id={id}
    //         deletefc={deleteItemContent}
    //         setContent={updateValueContent}
    //       />
    //     ),
    //   },
    // ]);
  }
  const store = useStoreApi();
  const { getNodes, setNodes } = store.getState();

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
          content: content.map((item) => {
            return { ...item, id: generateId() };
          }),
          id: idNow,
        },
      };
      data?.setNodes([...nodes, nodeToduplicateDuplicate]);
    }
  }
  function deleteNode() {
    const nodes = getNodes();
    let nodeToduplicate = nodes.filter((item) => item.id !== data?.id);
    data?.setNodes([...nodeToduplicate]);
  }

  useEffect(() => {
    if (content.length > 0) {
      if (nodesData.some((item) => item.id === content[0]?.id)) {
        let tamponNodeData: NodeDataType[] = nodesData.map((cnt) => {
          if (cnt.id === content[0].id) {
            return { ...cnt, value: content[0].value };
          } else {
            return cnt;
          }
        });

        setNodesData!(tamponNodeData);
      } else {
        setAddNodesData!({
          id: content[0]?.id,
          value: content[0]?.value,
          type: 'response',
        });
      }
    }
  }, [content]);

  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <LayoutTypesNode
        icon={<Image src={messageIcon} alt="" width={16} height={16} />}
        title="Message"
        color="bg-blue-message-primary"
        data={data}
        duplicate={duplicateNode}
        deleteNode={deleteNode}
      >
        <div className=" bg-mainDark w-full p-2 ">
          <div className=" flex flex-col gap-1 mb-2">
            {nodesData.map((item, index) => {
              if (item.id === data.id) {
                if (item.type === 'response') {
                  return (
                    <TextNode
                      key={index}
                      id={data.id}
                      deletefc={deleteItemContent}
                      setContent={updateValueContent}
                      defaultValue={item.value}
                    />
                  );
                } else if (item.type === 'question') {
                  return <div key={index}></div>;
                }
              }
            })}
          </div>
          <div className=" w-full flex flex-wrap  gap-x-1 gap-y-2">
            {nodesData.filter((item) => item.id === data.id).length === 0 && (
              <ButtonNode title="Text" fc={addTextNode} />
            )}

            {/* <ButtonNode title="Image" fc={addImageNode} />
            <ButtonNode title="Audio" fc={addAudioNode} />
            <ButtonNode title="video" fc={addVideoNode} />
            <ButtonNode title="Document" fc={addDocumentNode} />
            <ButtonNode title="Gift" fc={addGiftNode} /> */}
          </div>
        </div>
      </LayoutTypesNode>

      <Handle
        className=""
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export { MessageTypeNode };
