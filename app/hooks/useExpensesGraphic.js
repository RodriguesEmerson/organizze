import { useState, useEffect } from "react";
import { useTable } from "./useTable";
import { display, grid } from "@mui/system";
import { Ticks } from "chart.js";

export function useExpensesGraphic() {
   const { tableHandler } = useTable();
   const data = tableHandler.getSelectedMonthData().expenses;
   const graphicData = getExpensesData();
   function getExpensesData() {
      if (data) {
         const expensesData = {};
         data.forEach(expense => {
            expensesData[expense.categ]
               ? expensesData[expense.categ] = Number(expensesData[expense.categ]) + Number(expense.value)
               : expensesData[expense.categ] = Number(expense.value);
         });
         const categoriesNames = Object.keys(expensesData);
         const categoriesValues = Object.values(expensesData);

         return { categoriesNames: categoriesNames, categoriesValues: categoriesValues }
      }

   }

   const expensesGraphicConfig = {
      type: 'bar',
      data: {
         labels: graphicData.categoriesNames,
         datasets: [{
            label: 'Despesas por Categoria',
            data: graphicData.categoriesValues,
            backgroundColor: [
               '#D91136',
               // '#932BD9',
               // '#29A632',
               // '#F2BB13',
               // '#025259',
               // '#F28B0C',
               // '#049DD9',
               // '#400039'
            ],
         }]
         
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
            },
            x:{
               grid: {
                  display: false
               }
            }
         },
         plugins: {
            legend: {
               display: false,
               labels: {
                  boxWidth: 0
               }
            },

            tooltip: {
               usePointStyle: true,
               callbacks: {
                  label: function (context) {
                     let label = context.dataset.label || '';

                     if (label) {
                        // label += ': ';
                        label = ' '; //Remove o texto da tooltip flutuante.
                     }
                     if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                     }
                     return label;
                  },
                  labelPointStyle: function (context) {
                     return {
                        pointStyle: 'circle',
                     };
                  }
               },
            }
         }
      },
      plugins: [
         {
            id: 'custom-text-inside-labels',
            afterDatasetDraw(chart) {
               const { ctx, data } = chart;
               const dataset = chart.data.datasets[0];

               chart.getDatasetMeta(0).data.forEach((bar, index) => {
                  const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dataset.data[index]);
                  ctx.save();
                  ctx.fillStyle = '#61727C'; // Cor do texto
                  ctx.font = '9px Arial'; // Estilo da fonte
                  ctx.textAlign = 'center'; // Centraliza o texto horizontalmente
                  ctx.textBaseline = 'middle'; // Centraliza verticalmente
                  ctx.fillText(value, bar.x, bar.y - 5); // Adiciona o texto acima das barras
                  ctx.restore();
               });
            }
         }
      ]
   }

   return { getExpensesData, expensesGraphicConfig };
}