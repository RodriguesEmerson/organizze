/**
 * Faz a requisição para obter o resumo anual dos lançamentos financeiros.
 * 
 * @param {number|string} year - Ano para o qual se deseja obter o resumo.
 * @returns {Promise<Array>} Retorna uma Promise que resolve com os dados do resumo anual.
 * @throws {Error} Lança erro se a resposta da requisição não for OK, com o status HTTP.
 */
export async function getYearlySumaryService(year) {
   const url = `http://localhost/organizze-bk/public/entries.php?year=${year}&reportType=yearly`;

   const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
   });

   if (!response.ok) {
      throw new Error(response.status.toString());
   }

   return response.json();
}
