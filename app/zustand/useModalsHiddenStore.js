import { create } from "zustand";

export const useModalsHiddenStore = create ((set) =>({
   showAddReleaseModal: false,
   showInsertModal: false,
   showEditModal: false,
   showEditCategoryModal: false,
   setShowAddReleaseModal:() => set((state) =>({
      showAddReleaseModal: true
   })),
   setHiddenReleaseModal: () => set((state) => ({
      showAddReleaseModal: false,
   })),
   setHiddenAllModals: () => set(() => ({
      showAddReleaseModal: false,
      showInsertModal: false,
      showEditModal: false,
      showEditCategoryModal: false,
   })),
   setShowInsertModal: (status) => set(() => ({
      showInsertModal: status
   })),
   setShowEditModal: (status) => set(() => ({
      showEditModal: status
   })),
   setShowEditCategoryModal: (status) => set(() => ({
      showEditCategoryModal: status
   }))
}))