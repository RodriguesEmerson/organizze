import { useState } from "react";


export function useChartDoughnut(){

   const [ chartData, setchartData ] = useState({labels: [], values: []});

   const chartDoughnutConfig = {
      type: 'doughnut',
      data: {
         labels: chartData.labels,
         datasets: [{
            label: 'Receitas por Categoria',
            data: chartData.values,
            backgroundColor: [
               // '#D91136',
               '#025259',
               '#29A632',
               '#F2BB13',
               '#932BD9',
               '#F28B0C',
               '#049DD9',
               '#400039'
            ],
         }]

      },
      options: {
         scales: {
            y: {
               display: false,
               beginAtZero: false,
            },
            x: {
               display: false,
               grid: {
                  display: false
               }
            }
         },
         plugins: {
            legend: {
               display: true,
               position: 'top',
               labels: {
                  usePointStyle: true,
                  boxWidth: 5,
                  boxHeight: 7,
                  pointStyleWidth: 10,
                  padding: 2 
               }
            },

            tooltip: {
               usePointStyle: true,
               callbacks: {
                  label: function (context) {
                     const label = context.label || '';
                     const value = context.raw; // Valor correspondente
                     const percentage = (
                        (value / context.dataset.data.reduce((a, b) => a + b, 0)) *
                        100
                     ).toFixed(2); // Calcula a porcentagem com 2 casas decimais

                     // Retorna o texto personalizado
                     return `${label}: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} - (${percentage}%)`;
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
               const { ctx, data, chartArea } = chart;
               const dataset = chart.data.datasets[0];

               chart.getDatasetMeta(0).data.forEach((slice, index) => {
                  const { x, y } = slice.tooltipPosition(); // Posição central da fatia
                  const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.datasets[0].data[index]);
                  ctx.save();
                  ctx.fillStyle = '#fff'; // Cor do texto
                  ctx.font = '9px Arial'; // Estilo da fonte
                  // Configurando a sombra
                  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Cor da sombra
                  ctx.shadowBlur = 10; // Nível de desfoque
                  ctx.shadowOffsetX = 5; // Deslocamento horizontal
                  ctx.shadowOffsetY = 5; // Deslocamento verticalF
                  ctx.textAlign = 'top'; // Centraliza o texto horizontalmente
                  ctx.textBaseline = 'middle'; // Centraliza verticalmente
                  ctx.fillText(value, x - 30, y); // Adiciona o texto acima das barras
                  ctx.restore();
               });
            }
         }
      ]
   }

   return { chartDoughnutConfig, setchartData }
}