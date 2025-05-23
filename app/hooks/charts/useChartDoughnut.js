import { useState } from "react";
   // '#D91136',
   // '#025259',
   // '#29A632',
   // '#F2BB13',
   // '#932BD9',
   // '#F28B0C',
   // '#049DD9',
   // '#400039'

export function useChartDoughnut(){

   const [ chartData, setchartData ] = useState({labels: [], values: [], colors: [ '#D91136','#29A632']});

   const chartDoughnutConfig = {
      type: 'doughnut',
      data: {
         labels: chartData.labels,
         datasets: [{
            label: '',
            data: chartData.values,
            backgroundColor: chartData.colors,
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
                     return ` ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} - (${percentage}%)`;
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
               const chartLabels = data.labels;
               let tooltipLength = false;
               if(chartLabels.length == 1) {tooltipLength = 1};
               let onlyFirsValueSeted = false;

               chart.getDatasetMeta(0).data.forEach((slice, index) => {

                  //Adiciona apenas o primeiro valor no gráfico.
                  if(chartArea.onlyFirsValue && !onlyFirsValueSeted){
                     return onlyFirsValueSeted = true;
                  }

                  const { x, y } = slice.tooltipPosition(); // Posição central da fatia
                  const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.datasets[0].data[index]);
                  ctx.save();
                  ctx.fillStyle = '#fff'; // Cor do texto
                  ctx.font = '9px Arial'; // Estilo da fonte
                  // Configurando a sombra
                  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'; // Cor da sombra
                  ctx.shadowBlur = 10; // Nível de desfoque
                  ctx.shadowOffsetX = 5; // Deslocamento horizontal
                  ctx.shadowOffsetY = 5; // Deslocamento verticalF
                  // ctx.textAlign = 'top'; // Centraliza o texto horizontalmente
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