
export async function updateEntryService(updatedEntry) {
   try {
      const response = await fetch('http://localhost/organizze-bk/public/entries.php', {
         method: 'PUT',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(updatedEntry),
      });

      const result = await response.json();
      return { status: response.status, result };
   } catch (error) {
      console.error("Erro na requisição:", error);
      throw new Error('Algo de errado, tente novamente.');
   }
}