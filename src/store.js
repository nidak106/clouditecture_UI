import {create} from 'zustand';

const useStore = create((set) => ({
  navbarExpanded: true,
  showLeftPanel: true,
  showRightPanel: true,

  toggleNavbar: () => set((state) => ({
    navbarExpanded: !state.navbarExpanded,
    showLeftPanel: state.navbarExpanded ? false : state.showLeftPanel,
    showRightPanel: state.navbarExpanded ? false : state.showRightPanel,
  })),

  toggleLeftPanel: () => set((state) => ({
    showLeftPanel: !state.showLeftPanel
  })),

  toggleRightPanel: () => set((state) => ({
    showRightPanel: !state.showRightPanel
  })),
}));

export default useStore;
