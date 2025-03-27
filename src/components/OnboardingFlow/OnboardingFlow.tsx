import { useCallback, useEffect, useState } from 'react';
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

import { OnboardingNode } from './OnboardingNode';
import { type Step, useOnboardingStore } from '../../store/onboardingStore';
import { TaskDrawer } from './TaskDrawer';

// Register the OnboardingNode component
const nodeTypes: NodeTypes = {
  onboardingNode: OnboardingNode,
};

interface FlowChartProps {
  isEditable?: boolean;
}

function FlowChart({ isEditable = false }: FlowChartProps) {
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
    (params: Edge) => {
      if (isEditable) {
        addEdge(params);
      }
    },
    [addEdge, isEditable]
  );

  // Handle drawer close
  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedStep(null), 300);
  }, []);

  // Add onClick handler to nodes
  const nodes = flow.nodes.map(node => ({
    ...node,
    draggable: isEditable, // Allow dragging only in edit mode
    connectable: isEditable, // Allow connections only in edit mode
    data: {
      ...node.data,
      isEditable, // Pass editability to node component
      onClick: (step: Step) => {
        setSelectedStep(step);
        setIsDrawerOpen(true);
      }
    }
  }));

  // Pass the edit state to ReactFlow
  const edgesUpdatable = isEditable;
  const nodesDraggable = isEditable;
  const nodesConnectable = isEditable;
  const elementsSelectable = isEditable;

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
        onNodesChange={isEditable ? onNodesChange : undefined}
        onEdgesChange={isEditable ? onEdgesChange : undefined}
        onConnect={onConnect as OnConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={nodesDraggable}
        nodesConnectable={nodesConnectable}
        edgesUpdatable={edgesUpdatable}
        elementsSelectable={elementsSelectable}
      >
        <Background color="#f8fafc" gap={12} />
        <Controls />
        <MiniMap zoomable pannable />
        
        {/* Show edit mode indicator */}
        {isEditable && (
          <div 
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              padding: '4px 8px',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            Edit Mode
          </div>
        )}
      </ReactFlow>

      <TaskDrawer
        step={selectedStep}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}

interface OnboardingFlowProps {
  isEditable?: boolean;
}

export function OnboardingFlow({ isEditable = false }: OnboardingFlowProps) {
  return (
    <div className="h-[600px] w-full">
      <ReactFlowProvider>
        <FlowChart isEditable={isEditable} />
      </ReactFlowProvider>
    </div>
  );
} 