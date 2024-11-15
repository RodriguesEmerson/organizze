import { useEffect, useState } from "react";
import { useTableStore } from "../zustand/useTablesStore"
import useCalendar from "./useCalendar";
import { useCalendarStore } from "../zustand/useCalendarStore";


export function useNewRelease(){
   const { data, setData, categories, newReleaseType, months, selectedTable  } = useTableStore();
   const { datesHandler } = useCalendar();
   const [releaseMensage, setReleaseMensage] = useState(false);
   const { setMonthEndYear, yearMonths } = useCalendarStore();
   
   class Release{
      constructor(desc, categ, date, endDate = false, value){
         this.desc = desc
         this.categ = categ
         this.date = date
         this.endDate = endDate
         this.value = value
         this.id = releaseHandler.UUID();
      }
   }
   //Set the current monht on calendar.
   useEffect(()=> {setMonthEndYear({month: yearMonths.indexOf(selectedTable.month), year: selectedTable.year})},[])
   
   

   const releaseHandler  = {
      createNewRelease: function(e, type){
         e.preventDefault();

         //Gets form's data.
         const form = document.querySelector("#new-release-form");
         const formData = new FormData(form);
         const data = Object.fromEntries(formData.entries());

         //Select the categorie icon in categories;
         let categorie;
         categories[newReleaseType.type].forEach(element => {
            if(element.categ == data.categoria) categorie = element.icon;
         });

         //Converts the "data.valor" to a numeric value. (1.234,56 => 1234.56)
         let value = data.valor 
            ? data.valor.replace(".", "").replace(",", ".")
            : false;

         //Instantiates a new Release
         const newRelease = new Release(
            data.descricao, 
            categorie,
            datesHandler.dateConvert(data.data),
            data.dataFim ? datesHandler.dateConvert(data.dataFim) : false,
            value
         );
         
         //Check if all datas is OK, validating.
         if(releaseHandler.validateRelease(newRelease)){
            //If everything is OK, creates a new release.
            releaseHandler.updateData(newRelease, type);

            form.reset();
            //Hide the error mensage.
            setReleaseMensage(false);
            return;
         };
         setReleaseMensage({type: 'error', noti: 'Verifique os dados e tente novamente!'});
      },

      updateData: function(newRelease, type){
         const updatedData =  {...data};
         const newReleaseYear = new Date(newRelease.date).toLocaleDateString('en-US', {year: 'numeric'});
         const newReleaseMonth = new Date(newRelease.date).toLocaleDateString('pt-br', {month: 'long'});

         //Check if it has the selected year in db. If it doesn't have, create it.
         const hasNewReleaseYearInBD = updatedData[newReleaseYear]
         if(!hasNewReleaseYearInBD){
            this.createNewYearTable(updatedData, newReleaseYear);
         }
        
         //Check if it has the selected month in db. If it doesn't have, create it.
         const hasNewReleaseMonsthInBD = updatedData[newReleaseYear].months[newReleaseMonth];
         if(!hasNewReleaseMonsthInBD){
            this.createNewMonthTable(updatedData, newReleaseYear, newReleaseMonth);
            this.sortMonths(updatedData, newReleaseYear);
         }

         updatedData[newReleaseYear].months[newReleaseMonth][type].push(newRelease);
         setData(updatedData);
      },
      
      validateRelease: function(newRelease){
         
         const categoriesIcons =  categories[newReleaseType.type].map(item => item.icon);
         const isDescOK = newRelease.desc.length > 0 && newRelease.desc.length < 51;
         const isCategOK = categoriesIcons.includes(newRelease.categ);
         const isDateOK = datesHandler.isValidDate(newRelease.date);
         let isEndDateOK = datesHandler.isValidDate(newRelease.endDate);
         const isValueOK = !isNaN(Number(newRelease.value)) && Number(newRelease.value) > 0;
         
         !newRelease.endDate && (isEndDateOK = true);
         if(isDescOK && isCategOK && isDateOK && isEndDateOK && isValueOK) return true;
      },

      createNewYearTable: function(updatedData, newReleaseYear){
         updatedData[newReleaseYear] = {id: this.UUID(), months: {}};
      },
      createNewMonthTable: function(updatedData, newReleaseYear, newReleaseMonth){
         updatedData[newReleaseYear].months[newReleaseMonth] = {expenses: [], incomes: []}
      }, 
      sortMonths: function(updatedData, newReleaseYear){
         const sortedMonths = {}
         //Gets the months of newReleaseYear.
         const monthsTables = Object.keys(updatedData[newReleaseYear].months);

         //Sort the months tables.
         monthsTables.sort((prev, curr) => months.indexOf(prev) - months.indexOf(curr));
         monthsTables.forEach(month =>{
            sortedMonths[month] = updatedData[newReleaseYear].months[month]
         })

         //Update data.
         updatedData[newReleaseYear].months = sortedMonths;
      },

      UUID: function(){
         //Returns an UUID.
         return 'r-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
         })
      }
   }
   
   return { releaseHandler, releaseMensage }
}