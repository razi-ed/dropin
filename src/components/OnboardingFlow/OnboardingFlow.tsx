import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  type Connection,
  Controls,
  MiniMap,
  type NodeTypes,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { OnboardingNode } from './OnboardingNode';
import { useOnboardingStore, type OnboardingPhase, type OnboardingCluster } from '../../store/onboardingStore';

// Register custom node types
const nodeTypes: NodeTypes = {
  onboardingNode: OnboardingNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: '#6366F1',
    strokeWidth: 2,
  },
};

interface OnboardingFlowProps {
  selectedPhase?: OnboardingPhase;
  selectedCluster?: OnboardingCluster;
}

function FlowChart({ selectedPhase, selectedCluster }: OnboardingFlowProps) {
  const { fitView } = useReactFlow();
  const { 
    flow,
    onNodesChange,
    onEdgesChange,
    addEdge,
  } = useOnboardingStore();

  // Filter nodes based on selected phase and cluster
  const { nodes, edges } = useMemo(() => {
    if (!selectedPhase && !selectedCluster) {
      return flow;
    }

    const filteredNodes = flow.nodes.filter(node => {
      const { step } = node.data;
      return (
        (!selectedPhase || step.phase === selectedPhase) &&
        (!selectedCluster || step.cluster === selectedCluster)
      );
    });

    const nodeIds = new Set(filteredNodes.map(node => node.id));
    const filteredEdges = flow.edges.filter(
      edge => nodeIds.has(edge.source) && nodeIds.has(edge.target)
    );

    return { nodes: filteredNodes, edges: filteredEdges };
  }, [flow, selectedPhase, selectedCluster]);

  // Handle connection events
  const onConnect = useCallback(
    (params: Connection) => addEdge(params),
    [addEdge]
  );

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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      fitViewOptions={{ padding: 0.2 }}
    >
      <Background color="#f8fafc" gap={12} />
      <Controls />
      <MiniMap zoomable pannable />
      <Panel position="top-right">
        <div className="bg-white rounded-md shadow-md p-3 text-sm">
          <span className="font-medium">
            {selectedPhase && `Phase: ${selectedPhase}`}
            {selectedPhase && selectedCluster && ' | '}
            {selectedCluster && `Cluster: ${selectedCluster}`}
            {!selectedPhase && !selectedCluster && 'All Onboarding Items'}
          </span>
        </div>
      </Panel>
    </ReactFlow>
  );
}

export function OnboardingFlow(props: OnboardingFlowProps) {
  return (
    <div className="h-[600px] w-full">
      <ReactFlowProvider>
        <FlowChart {...props} />
      </ReactFlowProvider>
    </div>
  );
} 