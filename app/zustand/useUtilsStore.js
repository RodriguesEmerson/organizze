import { create } from "zustand";

export const useUtilsStore = create((set) =>({
   tooltipInfoText: false,
   setTooltipInfoText: () => set((state) =>({
      tooltipInfoText: !state.tooltipInfoText 
   })),
}));

// setShowAddReleaseModal:() => set((state) =>({
//    showAddReleaseModal: !state.showAddReleaseModal
// })),