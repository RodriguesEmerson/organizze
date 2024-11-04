
export function Table({ data }){
   const dados = {
      titulo: 'Despesas',
      headers: ['Descrição', 'Categoria', 'Data', 'Valor'],
      infos: [
         {descicao: 'Teste-1', categoria: 'Testando', data: '2024/11/04', valor: '1234,56', id: 123},
         {descicao: 'Teste-2', categoria: 'Testando', data: '2024/11/04', valor: '1234,56', id: 456},
         {descicao: 'Teste-3', categoria: 'Testando', data: '2024/11/04', valor: '1234,56', id: 789},
         {descicao: 'Teste-4', categoria: 'Testando', data: '2024/11/04', valor: '1234,56', id: 910}
      ]
   }
   return (
      <>
      </>
   )
}