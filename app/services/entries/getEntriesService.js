/**
 * Busca as entradas financeiras do backend conforme ano e mês.
 * 
 * @param {string|number} year - Ano desejado
 * @param {string} monthNumber - Mês no formato MM (ex: "01", "12")
 * @returns {Promise<{ entries: Array, sum: Array }>} Dados das entries e somas
 */
export async function getEntriesService(year, monthNumber) {
   const url = `http://localhost/organizze-bk/public/entries.php?year=${year}&month=${monthNumber}&reportType=monthly`;

   const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
   });

   if (!response.ok) {
      throw new Error(response.status);
   }

   return response.json();
}
