import React, { useState } from 'react';
import { Handle, Position, useStoreApi } from 'reactflow';
import { ContentNodeType, QuestionTypeNodeType } from '../types';
import { LayoutTypesNode } from '../LayoutTypesNode';

import messageTrickIcon from '../../../../../../../../../../public/icons/chatbot/message-tick.svg';
import Image from 'next/image';
import { ButtonNode } from '../ButtonNode';
import { generateId } from '@/utils/generateId';
import { AssignVariableNode } from './componentsNodes';

function ConditionalTypeNode({ data, isConnectable }: QuestionTypeNodeType) {
  const [content, setContent] = useState<ContentNodeType[]>([]);

  function deleteItemById(
    items: ContentNodeType[],
    idToDelete: string
  ): ContentNodeType[] {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    return updatedItems;
  }

  function deleteItemContent(id: string) {
    const tampon = deleteItemById(content, id);
    setContent(tampon);
  }
  function addAssignVariableNode() {
    const id = generateId();
    setContent([
      ...content,
      {
        id: id,
        component: <AssignVariableNode id={id} deletefc={deleteItemContent} />,
      },
    ]);
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
  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <LayoutTypesNode
        icon={<Image src={messageTrickIcon} alt="" width={16} height={16} />}
        title="Conditional"
        color="bg-green-emerald"
        data={data}
        duplicate={duplicateNode}
        deleteNode={deleteNode}
      >
        <div className=" bg-mainDark w-full p-2 ">
          <div className=" flex flex-col gap-1 mb-2">
            {content.map((item) => item.component)}
          </div>
          <div className=" w-full flex flex-wrap  gap-x-1 gap-y-2">
            <ButtonNode title="Assign variable" fc={addAssignVariableNode} />
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

export { ConditionalTypeNode };
