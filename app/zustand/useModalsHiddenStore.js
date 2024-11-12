import { create } from "zustand";

export const useModalsHiddenStore = create ((set) =>({
   showAddReleaseModal: false,
   setShowAddReleaseModal:() => set((state) =>({
      showAddReleaseModal: !state.showAddReleaseModal
   })),
   setHiddenReleaseModal: () => set((state) => ({
      showAddReleaseModal: false,
   })),
   setHiddenAllModals: () => set((state) => ({
      showAddReleaseModal: false,
   }))

   
   
}))