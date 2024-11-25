import { create } from "zustand";

export const useUtilsStore = create((set) =>({
   tooltipInfoText: false,
   setTooltipInfoText: (iconInfos) => set((state) =>({
      tooltipInfoText: iconInfos 
   })),
   showOkNotification: false,
   setShowOkNotification: (status) => set(() =>({
      showOkNotification: status
   }))
}));

// setShowAddReleaseModal:() => set((state) =>({
//    showAddReleaseModal: !state.showAddReleaseModal
// })),