import { create } from "zustand";

export const useModalsHidden = create ((set) =>({
   showAddReleaseModal: false,
   setShowAddReleaseModal:() => set((state) =>({
      showAddReleaseModal: !state.showAddReleaseModal
   })),
   setHiddenAllModals: () => set((state) => ({
      showAddReleaseModal: false,
   }))

   
   
}))