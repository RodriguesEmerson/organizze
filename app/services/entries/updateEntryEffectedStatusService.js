/**
 * Serviço que envia a atualização de uma entry para o backend.
 *
 * @param {{ id: string, effected: boolean }} data - Dados da entry a ser atualizada.
 * @returns {Promise<Response>} - Promessa com a resposta do backend.
 */
export async function updateEntryEffectedStatusService(data) {
  return fetch('http://localhost/organizze-bk/public/entries.php', {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}