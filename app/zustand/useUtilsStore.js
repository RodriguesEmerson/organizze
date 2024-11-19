import { create } from "zustand";

export const useUtilsStore = create((set) =>({
   tooltipInfoText: false,
   setTooltipInfoText: (iconInfos) => set((state) =>({
      tooltipInfoText: iconInfos 
   })),
}));

// setShowAddReleaseModal:() => set((state) =>({
//    showAddReleaseModal: !state.showAddReleaseModal
// })),