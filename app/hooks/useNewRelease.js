import { useEffect, useState } from "react";
import { useTableStore } from "../zustand/useTablesStore"
import useCalendar from "./useCalendar";
import { useCalendarStore } from "../zustand/useCalendarStore";


export function useNewRelease() {
   const { data, setData, categories, newReleaseType, months, selectedTable } = useTableStore();
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
      createNewRelease: function (e, type) {
         e.preventDefault();
         const formData = releaseHandler.getFormData();
         
         //Instantiates a new Release
         const newRelease = new Release(
            formData.descricao,
            formData.categoria,
            datesHandler.dateConvert(formData.data),
            formData.dataFim ? datesHandler.dateConvert(formData.dataFim) : false,
            formData.valor
         );
         console.log(newRelease)

         //Check if all datas is OK, validating.
         if (releaseHandler.validateRelease(newRelease)) {
            //If everything is OK, creates a new release.
            releaseHandler.saveRelease(newRelease, type);

            // form.reset();
            //Hide the error mensage.
            setReleaseMensage(false);
            return;
         };
         setReleaseMensage({ type: 'error', noti: 'Verifique os dados e tente novamente!' });
      },

      updateRelease: function (e, release, type, releaseID) {
         e.preventDefault();
         const formData = releaseHandler.getFormData();
         
         //Instantiates a new Release
         const ChangedRelease = new Release(
            formData.descricao,
            formData.categoria,
            datesHandler.dateConvert(formData.data),
            formData.dataFim ? datesHandler.dateConvert(formData.dataFim) : false,
            formData.valor,
            releaseID
         );
         console.log(ChangedRelease)

         //Check if all datas is OK, validating.
         if (releaseHandler.validateRelease(ChangedRelease)) {
            //If everything is OK, creates a new release.
            releaseHandler.saveRelease(release, type, true, releaseID);

            // form.reset();
            //Hide the error mensage.
            setReleaseMensage(false);
            return;
         };
         setReleaseMensage({ type: 'error', noti: 'Verifique os dados e tente novamente!' });
      },

      saveRelease: function (release, type, update) {
         const updatedData = { ...data };
         const releaseYear = new Date(release.date).toLocaleDateString('en-US', { year: 'numeric' });
         const releaseMonth = new Date(release.date).toLocaleDateString('pt-br', { month: 'long' });

         //Check if it has the selected year in db. If it doesn't have, create it.
         const hasReleaseYearInBD = updatedData[releaseYear]
         if (!hasReleaseYearInBD) {
            this.createNewYearTable(updatedData, releaseYear);
         }

         //Check if it has the selected month in db. If it doesn't have, create it.
         const hasReleaseMonsthInBD = updatedData[releaseYear].months[releaseMonth];
         if (!hasReleaseMonsthInBD) {
            this.createNewMonthTable(updatedData, releaseYear, releaseMonth);
            this.sortMonths(updatedData, releaseYear);
         }

         //Insert new release into the data.
         !update && updatedData[releaseYear].months[releaseMonth][type].push(release);

         if(update){
            if(hasReleaseYearInBD && hasReleaseMonsthInBD){
               //Criar função para adicionar o item altedao na base de dados.
            }
         }

         setData(updatedData);
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
            console.log(data)

         //Converts the "data.valor" to a numeric value. (1.234,56 => 1234.56)
         data.valor ? data.valor = data.valor.replace(".", "").replace(",", ".")
         : false;

         return data;

      },

      validateRelease: function (newRelease) {

         const categoriesIcons = categories[newReleaseType.type].map(item => item.icon);
         const isDescOK = newRelease.desc.length > 0 && newRelease.desc.length < 51;
         const isCategOK = categoriesIcons.includes(newRelease.categ);
         const isDateOK = datesHandler.isValidDate(newRelease.date);
         let isEndDateOK = datesHandler.isValidDate(newRelease.endDate);
         const isValueOK = !isNaN(Number(newRelease.value)) && Number(newRelease.value) > 0;

         !!!newRelease.endDate && (isEndDateOK = true);
         if (isDescOK && isCategOK && isDateOK && isEndDateOK && isValueOK) return true;
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