import { useState } from "react";


export function useChartLine(){
   const [ chartData, setchartData ] = useState({labels: [], values: [], colors: ['#D91136'], opacityColor: [['#D9113680']]});
   
   const chartLineConfig = {
      type: 'line',
      data: {
         // axis: 'y',
         labels: chartData.labels,
         datasets: [{
            label: 'Despesas por Categoria',
            data: chartData.values,
            borderColor: chartData.colors,
            backgroundColor:chartData.opacityColor,
            fill: true, // Habilitar preenchimento abaixo da linha
            tension: 0.4 // Suaviza a linha
         }]
         
      },

      options: {
         // indexAxis: chartData.orientation,
         scales: {
            y: {
               grid:{
                  display: false,
               },
               beginAtZero: true,
               ticks: {
                  display: false // Desativa os números do eixo Y
                },
            },
            x:{
               grid: {
                  display: false,
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
                        label = ' '; //Remove o texto da tooltip flutuante
                     }
                     label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
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
      }
   }

   return { chartLineConfig, setchartData }
}