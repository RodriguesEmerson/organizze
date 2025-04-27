import { create } from "zustand";

export const useToastNotifications = create((set) =>({
   notifications: [],
   setNotifications: ( mensage, id ) => set((state) =>({
      notifications: [
         ...state.notifications, 
         {message: mensage, isShowed: false, id: id}
      ]
   }))
}));
// {message: false, isShowed: false, id: '123d23efs3'}