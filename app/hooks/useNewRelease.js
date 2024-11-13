import { useState } from "react";
import { useTableStore } from "../zustand/useTablesStore"
import useCalendar from "./useCalendar";


export function useNewRelease(){
   const { data, setData, selectedTable, categories  } = useTableStore();
   const { datesHandler } = useCalendar();
   const [releaseMensage, setReleaseMensage] = useState(false);

    class Release{
      constructor(desc, categ, date, endDate = false, value){
         this.desc = desc
         this.categ = categ
         this.date = date
         this.endDate = endDate
         this.value = value
         this.id = this.UUID();
      }
      UUID(){
         return 'r-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
         })
      }
   }
  
   const releaseHandler  = {
      createNewRelease: function(e, type){
         e.preventDefault();

         //Take fom's data.
         const form = document.querySelector("#new-release-form");
         const formData = new FormData(form);
         const data = Object.fromEntries(formData.entries());

         //Select the categorie icon in categories;
         let categorie;
         categories.forEach(element => {
            if(element.categ == data.categoria) categorie = element.icon;
         });
         let value = data.valor 
            ? data.valor.replace(".", "").replace(",", ".")
            : false;
         console.log(value)
         
         //Create a new Release
         const newRelease = new Release(
            data.descricao, 
            categorie,
            datesHandler.dateConvert(data.data),
            data.dataFim ? datesHandler.dateConvert(data.dataFim) : false,
            value
         );

         if(releaseHandler.validateRelease(newRelease)){
            releaseHandler.updateData(newRelease, type);
            form.reset();
            setReleaseMensage(false);
            return;
         };
         setReleaseMensage({type: 'error', noti: 'Verifique os dados e tente novamente!'});
      },

      updateData: function(newRelease, type){
         const updatedData =  {...data};

         updatedData[selectedTable.year].months[selectedTable.month][type].push(newRelease);
         setData(updatedData);
      },
      
      validateRelease: function(newRelease){
         
         const categoriesIcons =  categories.map(item => item.icon);
         const isDescOK = newRelease.desc.length > 0 && newRelease.desc.length < 51;
         const isCategOK = categoriesIcons.includes(newRelease.categ);
         const isDateOK = datesHandler.isValidDate(newRelease.date);
         let isEndDateOK = datesHandler.isValidDate(newRelease.endDate);
         const isValueOK = !isNaN(Number(newRelease.value)) && Number(newRelease.value) > 0;
         
         !newRelease.endDate && (isEndDateOK = true);
         if(isDescOK && isCategOK && isDateOK && isEndDateOK && isValueOK) return true;
      }
   }
   
   return { releaseHandler, releaseMensage }
}