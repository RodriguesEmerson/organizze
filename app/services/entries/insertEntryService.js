/**
 * Envia uma nova entrada para a API do backend.
 *
 * @param {Object} insertingEntry - Objeto com os dados da entrada já formatados.
 * @param {string} insertingEntry.id - ID único da entrada.
 * @param {string} insertingEntry.date - Data no formato YYYY-MM-DD.
 * @param {number} insertingEntry.value - Valor numérico da entrada.
 * @param {string} insertingEntry.type - Tipo da entrada: "income" ou "expense".
 * @param {string} insertingEntry.description - Descrição da entrada.
 * @param {boolean} [insertingEntry.fixed] - Define se a entrada é fixa.
 * @param {string} [insertingEntry.end_date] - Data final da recorrência (se aplicável).
 * @returns {Promise<Response>} Retorna a promessa da requisição fetch.
 */
export async function insertEntryService(insertingEntry) {
   return fetch('http://localhost/organizze-bk/public/entries.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(insertingEntry)
   });
}
