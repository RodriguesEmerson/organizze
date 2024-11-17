import { useState } from "react";

export function useChartBar(){
   const [ chartData, setchartData ] = useState({labels: [], values: [], colors: ['#D91136']});
   
   const chartBarConfig = {
      type: 'bar',
      data: {
         labels: chartData.labels,
         datasets: [{
            label: 'Despesas por Categoria',
            data: chartData.values,
            backgroundColor:chartData.colors
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

   return { chartBarConfig, setchartData }
}