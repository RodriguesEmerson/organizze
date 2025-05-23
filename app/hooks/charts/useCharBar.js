import { useState } from "react";

export function useChartBar(){
   const [ chartData, setchartData ] = useState({labels: [], values: [], colors: ['#D91136'], orientation: 'x'});
   const chartBarConfig = {
      type: 'bar',
      data: {
         axis: 'y',
         labels: chartData.labels,
         datasets:  
            chartData.datasets 
            ? chartData.datasets 
            : [{
            data: chartData.values,
            backgroundColor:chartData.colors
            }]
      },
      options: {
         indexAxis: chartData.orientation,
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
         responsive: true, // Faz o gráfico se ajustar ao container
         maintainAspectRatio: false, // Permite esticar o gráfico com base no container
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
                        if(chartData.showLabel){
                           label += ': '; 
                        }else{
                           label = ' '; //Remove o texto da tooltip flutuante
                        }
                     }

                     //Tooltip do gráfico no eixo 'x'.
                     if (context.parsed.y !== null && chartData.orientation == 'x') {
                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                     }

                     //Tooltip do gráfico no exito no 'em pé'.
                     if (context.parsed.x !== null && chartData.orientation == 'y') {
                        label = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.x);
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
               
               const columnsGroupLength = (chart.data.datasets).length //Quantidade de barras em um conjuto do gráfico
               
               for(let column = 0; column <= columnsGroupLength; column++){
                  const dataset = chart.data.datasets[column]; //Coluna atual;

                  //Criando função para gerar o numeros no grafico anual
                  chart.getDatasetMeta(column).data.forEach((bar, index) => {

                     //Remove os números no topo da coluna se for true.
                     if(chartData.hiddenNumbers) return;

                     const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dataset.data[index]);
                     const rowValue = dataset.data[index];
                     const barWidth = chart.getDatasetMeta(column).data[index].width;

                     ctx.save();
                     ctx.fillStyle = chartData.orientation == 'x' ? '#61727C' : '#1a202c'; // Cor do texto
                     ctx.font = '9px Arial'; // Estilo da fonte
                     ctx.textAlign = chartData.orientation == 'x' ? 'center' : 'end'; // posição do texto horizontalmente
                     ctx.textBaseline = 'middle'; // Centraliza verticalmente

                     if(chartData.orientation == 'x'){
                        ctx.fillText(value,  bar.x, bar.y - 5); // Adiciona o texto acima das barras
                     }
                     if(chartData.orientation === "y"){
                        ctx.fillText(value, rowValue >= 0 
                           ? bar.x : 
                           bar.x, bar.y
                        ); // Adiciona o texto no interior das barras
                     }
                     
                     ctx.restore();
                  });
               };
            }
         }
      ]
   }

   return { chartBarConfig, setchartData }
}