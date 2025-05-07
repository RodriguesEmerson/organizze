import { create } from "zustand";

export const useUtilsStore = create((set) =>({
   tooltipInfoText: false,
   setTooltipInfoText: (iconInfos) => set((state) =>({
      tooltipInfoText: iconInfos 
   })),
   showOkNotification: {
      mesage: '', 
      show: false
   },
   setShowOkNotification: ( mensage, show) => set(() =>({
      showOkNotification: {mensage: mensage, show: show }
   }))
}));