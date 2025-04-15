'use client';

import { Select } from "@/app/components/selects/Select";
import { useSideBar } from "@/app/hooks/useSideBar";
import { useTableStore } from "@/app/zustand/useTablesStore";
import Link from "next/link";
import { useEffect, useState } from "react";


export function FormNewTable() {
   const { sideBarHandler } = useSideBar();
   const selectedTable = useTableStore(state => state.selectedTable);

   //Anos já inseridos na base de dados.
   const data = useTableStore((state) => state.data);
   const [availableMonths, setAvailableMonths] = useState();

   //Ano atual
   const currentYear = new Date().getFullYear();
   //Meses do ano.
   const months = useTableStore((state) => state.months);

   //Anos que serão mostrados na select.
   const years = [];
   for (let i = 0; i < 11; i++) {
      years.push(`${currentYear - 5 + i}`);
   }

   //Dados do formulário.
   const [formData, setFormData] = useState({ month: '', year: currentYear });

   //Atualiza os meses diponíveis em cada ano selecionado na select.
   useEffect(() => {
      if (!data) return;
      setAvailableMonths(sideBarHandler.availableMonthsToNewTable(formData.year));

      //Reseta o mês ao mudar o ano selcionado.
      setFormData({ ...formData, month: '' });
   }, [data, formData.year, selectedTable]);

   return (
      <div className="flex flex-col bg-gray-200 p-1 rounded-md mt-2">
         <h3 className="text-xs mb-1 font-semibold">Criar nova tabela:</h3>

         <form action="">
            <div className="flex flex-row gap-1">
               {availableMonths?.length > 0 &&
                  <Select
                     options={availableMonths}
                     value={formData.month}
                     width="87"
                     label={"Mês"}
                     name="month"
                     form={{ formData, setFormData }}
                  />
               }
               <Select
                  options={years}
                  value={formData.year}
                  width="67"
                  label={"Ano"}
                  name="year"
                  form={{ formData, setFormData }}
               />
            </div>

            {availableMonths?.length == 0 &&
               <p className="text-xs">Já existem tabelas em todos os meses do ano selecionado.</p>
            }

            <Link href={`/dashboard/monthly?year=${formData.year}&month=${formData.month}`}
               className={`bg-gray-900 text-white text-center block p-1 rounded-md w-full mt-1 hover:bg-gray-950 transition-all
                   ${(!!!formData.month || !!!formData.year) && "!bg-gray-400 hover:!bg-gray-400"}`}
               onClick={(e) => {
                  if (!!!formData.month || !!!formData.year) return e.preventDefault();
                  sideBarHandler.creteNewTable(data, formData.year, formData.month);
                  setFormData({ ...formData, month: '' })
               }
               }
            >
               Criar
            </Link>
         </form>

      </div>
   )
}