import { create } from "zustand";

export const useToastNotifications = create((set) =>({
   notifications: [],
   setNotifications: ( mensage, type, id ) => set((state) =>({
      notifications: [
         ...state.notifications, 
         {message: mensage, type: type, isShowed: false, id: id}
      ]
   })),
   deletNotification: (id) => set(state => ({
      notifications: state.notifications.filter(notification => notification.id != id)
   }))
}));