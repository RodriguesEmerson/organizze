import { create } from "zustand";

export const useModalsHiddenStore = create ((set) =>({
   showAddReleaseModal: false,
   showEditModal: false,
   setShowAddReleaseModal:() => set((state) =>({
      showAddReleaseModal: true
   })),
   setHiddenReleaseModal: () => set((state) => ({
      showAddReleaseModal: false,
   })),
   setHiddenAllModals: () => set((state) => ({
      showAddReleaseModal: false,
   })),
   setShowEditModal: (status) => set(() => ({
      showEditModal: status
   }))
}))