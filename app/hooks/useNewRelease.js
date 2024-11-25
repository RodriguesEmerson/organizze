import { useEffect, useState } from "react";
import { useTableStore } from "../zustand/useTablesStore"
import useCalendar from "./useCalendar";
import { useCalendarStore } from "../zustand/useCalendarStore";
import { useUtilsStore } from "../zustand/useUtilsStore";


export function useNewRelease() {
   const { data, setData, categories, newReleaseType, months, selectedTable, editingRelease } = useTableStore();
   const setShowOkNotification = useUtilsStore((state) => state.setShowOkNotification);
   const { datesHandler } = useCalendar();
   const [releaseMensage, setReleaseMensage] = useState(false);
   const { setMonthEndYear, yearMonths } = useCalendarStore();

   class Release {
      constructor(desc, categ, date, endDate = false, value, id = false) {
         this.desc = desc
         this.categ = categ
         this.date = date
         this.endDate = endDate
         this.value = value
         this.id = id ? id : releaseHandler.UUID();
      }
   }
   //Set the current monht on calendar.
   useEffect(() => { setMonthEndYear({ month: yearMonths.indexOf(selectedTable.month), year: selectedTable.year }) }, [])

   const releaseHandler = {
      createNewRelease: function(e, formData) {
         e.preventDefault();
         
         //Instantiates a new Release
         const newRelease = new Release(
            formData.desc,
            formData.categ,
            datesHandler.dateConvert(formData.date),
            formData.endDate ? datesHandler.dateConvert(formData.endDate) : false,
            this.convertToNumericValue(formData.value)
         );

         //Check if all datas is OK, validating.
         if (releaseHandler.validateRelease(newRelease)) {
            //If everything is OK, creates a new release.
            releaseHandler.saveRelease(newRelease);

            //Hide the error mensage.
            setReleaseMensage(false);
            return;
         };
         setReleaseMensage({ type: 'error', noti: 'Verifique os dados e tente novamente!' });
      },

      updateRelease: function (e, formData) {
         e.preventDefault();

         //Instantiates the chagend Release
         const modifiedRelease = new Release(
            formData.desc,
            formData.categ,
            datesHandler.dateConvert(formData.date),
            formData.endDate ? datesHandler.dateConvert(formData.endDate) : false,
            this.convertToNumericValue(formData.value),
            formData.id
         );

         //Check if all datas is OK, validating.
         if (releaseHandler.validateRelease(modifiedRelease)) {
            //If everything is OK, update the release.
            releaseHandler.saveRelease(modifiedRelease, true);

            //Hide the error mensage.
            setReleaseMensage(false);
            return;
         };
         console.log('nao foi')
         setReleaseMensage({ type: 'error', noti: 'Verifique os dados e tente novamente!' });
      },

      saveRelease: function (release, update) {
         const updatedData = { ...data };
         const releaseYear = new Date(release.date).toLocaleDateString('en-US', { year: 'numeric' });
         const releaseMonth = new Date(release.date).toLocaleDateString('pt-br', { month: 'long' });

         // Helper function to ensure the year and month exist in the database.
         this.ensureYearAndMonthExist(updatedData, releaseYear, releaseMonth);

         //Table where the release will be placed
         const destinationTable = updatedData[releaseYear].months[releaseMonth][newReleaseType.type];

         //Source release table.
         const sourceTable = updatedData[selectedTable.year].months[selectedTable.month][newReleaseType.type];

         //Insert new release into the data.
         !update && destinationTable.push(release);

         if (update) {
            //Check if it has the release in selected month
            if ((releaseMonth == selectedTable.month) && (releaseYear == selectedTable.year)) {
               const releaseIndex = destinationTable.findIndex(item => item.id === editingRelease.id);
               if (releaseIndex !== -1) {
                  destinationTable[releaseIndex] = release;
               }
               
            }else{
               //When release month modified is different from the source release month.
               //Filter the source table, removing the modified release.
               const filteredTable = sourceTable.filter(item => item.id != release.id);

               //Update the source table.
               updatedData[selectedTable.year].months[selectedTable.month][newReleaseType.type] = filteredTable;
               
               //Insert the entry into the destination table.
               destinationTable.push(release)
            };
         }

         setData(updatedData);
         setShowOkNotification(true);
      },

      getFormData: function () {
         //Gets form's data.
         const form = document.querySelector("#new-release-form");
         const formData = new FormData(form);
         const data = Object.fromEntries(formData.entries());

         //Select the categorie icon in categories;
         categories[newReleaseType.type].forEach(element => {
            (element.categ == data.categoria) && (data.categoria = element.icon);
         });

         //Converts the "data.valor" to a numeric value. (1.234,56 => 1234.56)
         data.valor ? data.valor = data.valor.replace(".", "").replace(",", ".")
            : false;

         return data;
      },

      convertToNumericValue: function(value){
         if(!!!value) return false;
         return value.replace(".", "").replace(",", ".");
      },

      validateRelease: function (newRelease) {

         const categoriesIcons = categories[newReleaseType.type].map(item => item.categ);
         const isDescOK = newRelease.desc.length > 0 && newRelease.desc.length < 51;
         const isCategOK = categoriesIcons.includes(newRelease.categ);
         const isDateOK = datesHandler.isValidDate(newRelease.date);
         let isEndDateOK = datesHandler.isValidDate(newRelease.endDate);
         const isValueOK = !isNaN(Number(newRelease.value)) && Number(newRelease.value) > 0;

         !!!newRelease.endDate && (isEndDateOK = true);
         if (isDescOK && isCategOK && isDateOK && isEndDateOK && isValueOK) return true;
      },

      ensureYearAndMonthExist: function(updatedData, year, month){
         if(!updatedData[year]){
            this.createNewMonthTable(updatedData, year)
         }
         if(!updatedData[year].months[month]){
            this.createNewMonthTable(updatedData, year, month);
            this.sortMonths(updatedData, year);
         }
      },

      createNewYearTable: function (updatedData, newReleaseYear) {
         updatedData[newReleaseYear] = { id: this.UUID(), months: {} };
      },

      createNewMonthTable: function (updatedData, newReleaseYear, newReleaseMonth) {
         updatedData[newReleaseYear].months[newReleaseMonth] = { expenses: [], incomes: [] }
      },

      sortMonths: function (updatedData, newReleaseYear) {
         const sortedMonths = {}
         //Gets the months of newReleaseYear.
         const monthsTables = Object.keys(updatedData[newReleaseYear].months);

         //Sort the months tables.
         monthsTables.sort((prev, curr) => months.indexOf(prev) - months.indexOf(curr));
         monthsTables.forEach(month => {
            sortedMonths[month] = updatedData[newReleaseYear].months[month]
         })

         //Update data.
         updatedData[newReleaseYear].months = sortedMonths;
      },

      UUID: function () {
         //Returns an UUID.
         return 'r-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
         })
      }
   }

   return { releaseHandler, releaseMensage }
}