import { create } from "zustand";

export const useModalsHiddenStore = create ((set) =>({
   showInsertModal: false,
   showEditModal: false,
   showEditCategoryModal: false,
   showAddConfirmModal: false,

   setHiddenAllModals: () => set(() => ({
      showInsertModal: false,
      showEditModal: false,
      showEditCategoryModal: false,
      showAddConfirmModal: false,
   })),
   setShowInsertModal: (status) => set(() => ({
      showInsertModal: status
   })),
   setShowEditModal: (status) => set(() => ({
      showEditModal: status
   })),
   setShowEditCategoryModal: (status) => set(() => ({
      showEditCategoryModal: status
   })),
   setShowAddConfirmModal: (status) => set((state) => ({
      showAddConfirmModal: status
   })),
}))