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
      },
      plugins: [
         {
            id: 'custom-text-inside-labels',
            afterDatasetDraw(chart) {
               const { ctx, data } = chart;
               const dataset = chart.data.datasets[0];

               chart.getDatasetMeta(0).data.forEach((bar, index) => {

                  //Largura em pixels de cada barra.
                  // console.log(chart.getDatasetMeta(0).data[index].width);

                  // const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dataset.data[index]);
                  // const rowValue = dataset.data[index];
                  // const barWidth = chart.getDatasetMeta(0).data[index].width;

                  ctx.save();
                  // ctx.fillStyle = chartData.orientation == 'x' ? '#61727C' : '#1a202c'; // Cor do texto
                  ctx.font = '9px Arial'; // Estilo da fonte
                  ctx.textAlign = chartData.orientation == 'x' ? 'center' : 'end'; // posição do texto horizontalmente
                  ctx.textBaseline = 'middle'; // Centraliza verticalmente

                  // if(chartData.orientation == 'x'){
                  //    ctx.fillText(value,  bar.x, bar.y - 5); // Adiciona o texto acima das barras
                  // }else{
                  //    ctx.fillText(value, rowValue >= 0 
                  //       ? bar.x : 
                  //       bar.x + barWidth, bar.y
                  //    ); // Adiciona o texto no interior das barras
                  // }
                  
                  ctx.restore();
               });
            }
         }
      ]
   }

   return { chartLineConfig, setchartData }
}