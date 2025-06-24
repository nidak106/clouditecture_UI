import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';

const initialNodes = [
  { id: '1', data: { label: "Node 1" }, position: { x: 0, y: 0 }, type: "custom" },
  { id: '2', data: { label: "Node 2" }, position: { x: 300, y: 200 }, type: "custom" }
];

const initialEdges = [
  { id: 'e1', source: '1', sourceHandle: 'rightSource', target: '2', targetHandle: 'leftTarget' },
  { id: 'e2', source: '1', sourceHandle: 'bottomSource', target: '2', targetHandle: 'topTarget' }
];

const useFlowStore = create((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(connection, state.edges),
    })),

  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),

  updateNodeLabel: (nodeId, newLabel) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
      ),
    })),
}));

export default useFlowStore;
