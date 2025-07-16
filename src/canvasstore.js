import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';

const initialNodes = [
  { id: '1', data: { label: "Node 1" }, position: { x: 0, y: 0 }, type: "custom" },
  { id: '2', data: { label: "Node 2" }, position: { x: 100, y: 100 }, type: "custom" }
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

    clipboard: null, // for copy/cut buffer

deleteNode: (nodeId) =>
  set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== nodeId),
    edges: state.edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ),
    selectedNodeId: null,
  })),

copyNode: () =>
  set((state) => {
    const node = state.nodes.find((n) => n.id === state.selectedNodeId);
    return node ? { clipboard: { ...node } } : {};
  }),

cutNode: () =>
  set((state) => {
    const node = state.nodes.find((n) => n.id === state.selectedNodeId);
    return node
      ? {
          clipboard: { ...node },
          nodes: state.nodes.filter((n) => n.id !== node.id),
          edges: state.edges.filter(
            (edge) => edge.source !== node.id && edge.target !== node.id
          ),
          selectedNodeId: null,
        }
      : {};
  }),

pasteNode: () =>
  set((state) => {
    const node = state.clipboard;
    if (!node) return {};
    const newId = (Date.now() + "").slice(-6); // simple unique ID
    const newNode = {
      ...node,
      id: newId,
      position: {
        x: node.position.x + 100,
        y: node.position.y + 100,
      },
    };
    return {
      nodes: [...state.nodes, newNode],
      selectedNodeId: newId,
    };
  }),

duplicateNode: () =>
  set((state) => {
    const original = state.nodes.find((n) => n.id === state.selectedNodeId);
    if (!original) return {};
    const newId = (Date.now() + "").slice(-6);
    const newNode = {
      ...original,
      id: newId,
      position: {
        x: original.position.x + 50,
        y: original.position.y + 50,
      },
    };
    return {
      nodes: [...state.nodes, newNode],
      selectedNodeId: newId,
    };
  }),

}));

export default useFlowStore;
