import { useEffect, useState } from "react";
import { getAvailablesTablesService } from "@/app/services/entries/getAvailableTablesService";

/**
 * Hook para buscar as tabelas disponíveis, organizadas por ano e meses.
 * 
 * @returns {{ availableTables: Object | undefined }} Estado com as tabelas disponíveis.
 */
export function useGetAvailableTables() {
   const [availableTables, setAvailableTables] = useState();

   useEffect(() => {
      async function getData() {
         const tables = await getAvailablesTablesService();
         setAvailableTables(tables);
      }

      getData();
   }, []);

   return { availableTables };
}
