import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow';
import type{ 
  Edge, 
  Node, 
  NodeChange, 
  EdgeChange, 
  Connection,
} from 'reactflow';

export type OnboardingPhase = 'day1' | 'day7' | 'day21';

export type OnboardingCluster = 
  | 'Development environment'
  | 'Company Architecture'
  | 'Tool Access'
  | 'CI/CD workflow'
  | 'Team Processes';

export type DocumentLink = {
  type: 'document';
  url: string;
};

export type CheckList = {
  type: 'checklist';
  items: Array<{
    id: string;
    text: string;
    checked: boolean;
  }>;
};

export type TaskStatus = 'completed' | 'todo' | 'inprogress';

export interface Step {
  id: string;
  title: string;
  description: string;
  phase: OnboardingPhase;
  cluster: OnboardingCluster;
  content: DocumentLink | CheckList;
  status: TaskStatus;
}

export interface OnboardingNode extends Node {
  data: {
    step: Step;
  };
}

// export interface OnboardingEdge extends Edge {
//   // Additional properties for edges if needed
// }

export interface Flow {
  nodes: OnboardingNode[];
  edges: Edge[];
}

interface OnboardingState {
  flow: Flow;
  steps: Step[];
  
  // Node and edge operations
  addNode: (node: Omit<OnboardingNode, 'id'>) => void;
  updateNode: (id: string, node: Partial<OnboardingNode>) => void;
  removeNode: (id: string) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  
  addEdge: (edge: Edge | Connection) => void;
  updateEdge: (id: string, edge: Partial<Edge>) => void;
  removeEdge: (id: string) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  
  // Step operations
  addStep: (step: Omit<Step, 'id'>) => void;
  updateStep: (id: string, step: Partial<Step>) => void;
  removeStep: (id: string) => void;
  updateStepStatus: (id: string, status: TaskStatus) => void;
  
  // Filtering
  getStepsByPhase: (phase: OnboardingPhase) => Step[];
  getStepsByCluster: (cluster: OnboardingCluster) => Step[];
  getStepsByStatus: (status: TaskStatus) => Step[];
  
  // Export/Import
  exportState: () => string;
  importState: (jsonState: string) => void;
  
  reset: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultFlow: Flow = {
  nodes: [],
  edges: []
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      flow: defaultFlow,
      steps: [],
      
      // Node operations
      addNode: (node) => set((state) => {
        const id = generateId();
        const newNode = { ...node, id };
        return {
          flow: {
            ...state.flow,
            nodes: [...state.flow.nodes, newNode]
          }
        };
      }),
      
      updateNode: (id, node) => set((state) => ({
        flow: {
          ...state.flow,
          nodes: state.flow.nodes.map((n) => 
            n.id === id ? { ...n, ...node } : n
          )
        }
      })),
      
      removeNode: (id) => set((state) => ({
        flow: {
          ...state.flow,
          nodes: state.flow.nodes.filter((n) => n.id !== id)
        }
      })),
      
      onNodesChange: (changes) => set((state) => ({
        flow: {
          ...state.flow,
          nodes: applyNodeChanges(changes, state.flow.nodes)
        }
      })),
      
      // Edge operations
      addEdge: (edge) => set((state) => {
        const id = 'id' in edge ? edge.id : generateId();
        const newEdge = 'id' in edge 
          ? edge 
          : { ...edge, id, source: edge.source || '', target: edge.target || '' };
        
        return {
          flow: {
            ...state.flow,
            edges: [...state.flow.edges, newEdge as Edge]
          }
        };
      }),
      
      updateEdge: (id, edge) => set((state) => ({
        flow: {
          ...state.flow,
          edges: state.flow.edges.map((e) => 
            e.id === id ? { ...e, ...edge } : e
          )
        }
      })),
      
      removeEdge: (id) => set((state) => ({
        flow: {
          ...state.flow,
          edges: state.flow.edges.filter((e) => e.id !== id)
        }
      })),
      
      onEdgesChange: (changes) => set((state) => ({
        flow: {
          ...state.flow,
          edges: applyEdgeChanges(changes, state.flow.edges)
        }
      })),
      
      // Step operations
      addStep: (step) => set((state) => {
        const id = generateId();
        const newStep = { ...step, id };
        return {
          steps: [...state.steps, newStep]
        };
      }),
      
      updateStep: (id, step) => set((state) => ({
        steps: state.steps.map((s) => 
          s.id === id ? { ...s, ...step } : s
        )
      })),
      
      removeStep: (id) => set((state) => ({
        steps: state.steps.filter((s) => s.id !== id)
      })),
      
      updateStepStatus: (id, status) => set((state) => ({
        steps: state.steps.map((step) => 
          step.id === id ? { ...step, status } : step
        )
      })),
      
      // Filtering
      getStepsByPhase: (phase) => {
        return get().steps.filter((step) => step.phase === phase);
      },
      
      getStepsByCluster: (cluster) => {
        return get().steps.filter((step) => step.cluster === cluster);
      },
      
      getStepsByStatus: (status) => {
        return get().steps.filter((step) => step.status === status);
      },
      
      // Export/Import
      exportState: () => {
        const { flow, steps } = get();
        return JSON.stringify({ flow, steps });
      },
      
      importState: (jsonState) => {
        try {
          const { flow, steps } = JSON.parse(jsonState);
          set({ flow, steps });
        } catch (error) {
          console.error('Failed to import state:', error);
        }
      },
      
      reset: () => set({ flow: defaultFlow, steps: [] })
    }),
    {
      name: 'onboarding-storage',
    }
  )
); 