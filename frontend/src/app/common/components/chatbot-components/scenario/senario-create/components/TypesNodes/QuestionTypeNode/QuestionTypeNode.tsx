import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { ContentNodeType, QuestionTypeNodeType } from '../types';
import { LayoutTypesNode } from '../LayoutTypesNode';
import messageIcon from '../../../../../../../../../../public/icons/chatbot/message-text.svg';
import messageQuestion from '../../../../../../../../../../public/icons/chatbot/message-question.svg';
import Image from 'next/image';
import { ButtonNode } from '../ButtonNode';
import { generateId } from '@/utils/generateId';
import { AddTextNode, ImageNode } from './componentsNodes';
import { useStoreApi } from 'reactflow';
import { NodeDataType, useSenarioCreate } from '@/zustand_store';

function QuestionTypeNode({ data, isConnectable }: QuestionTypeNodeType) {
  // const [content, setContent] = useState<ContentNodeType[]>([]);
  const nodesData = useSenarioCreate((state) => state.nodesData);
  const [content, setContent] = useState<NodeDataType[]>(
    nodesData.filter((item) => item.id === data.id)
  );
  const [imageDel, setImageDel] = useState<boolean>(false);
  const { setNodesData, setAddNodesData } = useSenarioCreate();
  function deleteItemById(
    items: NodeDataType[],
    idToDelete: string
  ): NodeDataType[] {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    return updatedItems;
  }
  function deleteItemContent(id: string) {
    const tampon = deleteItemById(content, id);
    setNodesData!(nodesData.filter((item) => item.id != id));
    setContent(tampon);
  }
  function deleteItemContentLink(id: string) {
    const tampon = deleteItemById(content, id);
    setNodesData!(nodesData.filter((item) => item.id != id));
    setContent(tampon);
  }
  function addTextNode() {
    setContent([
      ...content,
      {
        id: data?.id,
        value: '',
        type: 'question',
      },
    ]);
    setAddNodesData!({
      id: data?.id,
      value: '',
      type: 'question',
    });
  }
  function addImage() {
    if (content[0]) {
      setContent((cont) => {
        let newTable: NodeDataType[] = [];
        let content = cont.forEach((cnt) => {
          if (cnt.id === data?.id) {
            return newTable.push({ ...cnt, link: ' ' });
          } else {
            return newTable.push(cnt);
          }
        });
        return newTable;
      });
    } else {
      setContent([
        ...content,
        {
          id: data?.id,
          type: 'question',
          link: ' ',
        },
      ]);
      setAddNodesData!({
        id: data?.id,
        type: 'question',
        link: ' ',
      });
    }
  }
  console.log(content[0]);

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
    let nodeToduplicate = nodes.filter((item) => item.id !== data?.id);
    data?.setNodes([...nodeToduplicate]);
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
  function updateValueContentLink(id: string, value?: string) {
    setContent((cont) => {
      let newTable: NodeDataType[] = [];
      let content = cont.forEach((cnt) => {
        if (cnt.id === id) {
          if (value === undefined) {
            return newTable.push({
              id: cnt.id,
              value: cnt.value,
              type: cnt.type,
            });
          }
          return newTable.push({ ...cnt, link: value });
        } else {
          return newTable.push(cnt);
        }
      });

      return newTable;
    });
    !value && setImageDel(!imageDel);
  }

  useEffect(() => {
    if (content.length > 0) {
      if (nodesData.some((item) => item.id === content[0]?.id)) {
        let tamponNodeData: NodeDataType[] = nodesData.map((cnt) => {
          if (cnt.id === content[0].id) {
            let nodeContent = { ...cnt, value: content[0].value };
            content[0].link
              ? (nodeContent = { ...nodeContent, link: content[0].link })
              : (nodeContent = { ...nodeContent });
            return nodeContent;
          } else {
            return cnt;
          }
        });
        setNodesData!(tamponNodeData);
      } else {
        setAddNodesData!({
          id: content[0]?.id,
          value: content[0]?.value,
          type: 'question',
        });
      }
    }
  }, [content, imageDel]);
  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <LayoutTypesNode
        icon={<Image src={messageQuestion} alt="" width={16} height={16} />}
        title="Question"
        color="bg-error-default-light"
        data={data}
        duplicate={duplicateNode}
        deleteNode={deleteNode}
      >
        <div className=" bg-mainDark w-full p-2 ">
          <div className=" flex flex-col gap-1 mb-2">
            {/* {content.map((item) => item.component)} */}
            {nodesData.map((item, index) => {
              if (item.id === data.id) {
                if (item.type === 'question') {
                  return (
                    <div key={index} className=" flex flex-col gap-2">
                      {item?.value !== undefined && (
                        <AddTextNode
                          id={data.id}
                          deletefc={deleteItemContent}
                          setContent={updateValueContent}
                          defaultValue={item.value}
                        />
                      )}
                      {item.link !== undefined && (
                        <ImageNode
                          id={data.id}
                          deletefc={deleteItemContent}
                          setContent={updateValueContentLink}
                          defaultValue={item.link}
                        />
                      )}
                    </div>
                  );
                } else if (item.type === 'response') {
                  return <div key={index}></div>;
                }
              }
            })}
            {/* <ImageNode
              id={data.id}
              deletefc={deleteItemContent}
              setContent={updateValueContentLink}
              defaultValue={'df'}
            /> */}
          </div>
          <div className=" w-full flex flex-wrap  gap-x-1 gap-y-2">
            {content[0]?.value === undefined &&
              content[0]?.link === undefined && (
                <ButtonNode title="Add text" fc={addTextNode} />
              )}
            {content[0]?.link === undefined &&
              content[0]?.value === undefined && (
                // <ButtonNode
                //   disabled={content.length !== 1}
                //   title="Stock answer var"
                //   fc={addStockAnswerNode}
                // />
                <ButtonNode title="Image" fc={addImage} />
              )}
            {/* <ButtonNode title="Audio" fc={addAudioNode} />
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
      ></Handle>
    </div>
  );
}

export { QuestionTypeNode };
