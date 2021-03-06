import { useCallback, useState, useRef, useMemo } from 'react';
import ReactFlow, { ReactFlowProvider , useEdgesState, addEdge, useNodesState, MiniMap, Controls, Background } from 'react-flow-renderer';

import Sidebar from '../components/sidebar';
import CustomDefault from '../components/nodes/customDefault';

import styles from '../styles/Home.module.css';

const defaultEdgeOptions = { animated: false };

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Home({ initialNodes, initialEdges }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const nodeTypes = useMemo(() => ({ customDefault: CustomDefault }), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className={styles.dndflow}>
      <ReactFlowProvider>
        <Sidebar />
        <div className={styles.reactflowWrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
          >
            <Background variant="dots" gap={12} size={0.3} />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        
      </ReactFlowProvider>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://medalc.unisante.ch/api/v1/versions/1')
  const data = await res.json()

  const { nodes, diagnoses } = data.medal_r_json

  const initialNodes = []
  const initialEdges = []

  Object.values(diagnoses[1].instances).forEach(instance => {
    const currentNode = nodes[instance.id]

    initialNodes.push({
      id: currentNode.id.toString(),
      type: currentNode.conditions?.length > 0 ? 'customDefault' : 'input',
      position: {x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500)},
      data: {
        label: currentNode.label.en,
        answers: currentNode.answers
      }
    })

    instance.children.forEach(child => {
      initialEdges.push({
        id: `edge_${currentNode.id}_${child}`,
        source: currentNode.id.toString(),
        target: child.toString()
      })
    })
  })

  return {
    props: {
      initialNodes,
      initialEdges,
    }
  }
}