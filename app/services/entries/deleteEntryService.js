/**
 * Faz a requisição para deletar uma entry pelo ID.
 * 
 * @param {number|string} entryId - ID da entry a ser deletada
 * @returns {Promise<Response>} Resposta da API
 */
export async function deleteEntryService(entryId) {
   return fetch('http://localhost/organizze-bk/public/entries.php', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: entryId }),
   });
}
