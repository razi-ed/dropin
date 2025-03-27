import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  type Edge,
  MiniMap,
  type NodeTypes,
  type OnConnect,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { type Step, useOnboardingStore } from '../../store/onboardingStore';
import { TaskCard } from '../../components/OnboardingFlow/TaskCard';
import { TaskDrawer } from '../../components/OnboardingFlow/TaskDrawer';

// Custom node component that uses TaskCard
function CustomNode({ data }: { data: { step: Step, onClick: (step: Step) => void  } }) {
  const handleCardClick = data.onClick;
  
  return (
    <div className="w-80">
      <TaskCard step={data.step} onClick={handleCardClick} />
    </div>
  );
}

// Register custom node types
const nodeTypes: NodeTypes = {
  customNode: CustomNode,
};

function FlowChart() {
  const { fitView } = useReactFlow();
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { 
    flow,
    onNodesChange,
    onEdgesChange,
    addEdge,
  } = useOnboardingStore();

  // Handle connection events
  const onConnect = useCallback(
    (params: Edge) => addEdge(params),
    [addEdge]
  );

  // Prepare nodes with TaskCard integration
  const nodes = useMemo(() => {
    return flow.nodes.map(node => ({
      ...node,
      type: 'customNode',
      data: {
        ...node.data,
        onClick: (step: Step) => {
          setSelectedStep(step);
          setIsDrawerOpen(true);
        }
      }
    }));
  }, [flow.nodes]);

  // Handle drawer close
  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedStep(null), 300);
  }, []);

  // Fit view whenever nodes change
  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.2 });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nodes, fitView]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={flow.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect as OnConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background color="#f8fafc" gap={12} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>

      <TaskDrawer
        step={selectedStep}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}

export function OnboardingFlow() {
  return (
    <div className="h-[600px] w-full">
      <ReactFlowProvider>
        <FlowChart />
      </ReactFlowProvider>
    </div>
  );
}