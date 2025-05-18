/**
 * Busca as tabelas disponíveis na API e organiza por ano e meses.
 * 
 * @returns {Promise<Object>} Objeto com os anos como chaves e arrays de meses como valores.
 */
export async function getAvailablesTablesService() {
   try {
      const response = await fetch('http://localhost/organizze-bk/public/entries.php?reportType=availableTables', {
         method: 'GET',
         credentials: 'include',
      });

      const result = await response.json();
      const availableTables = {};

      if (result) {
         result.forEach(date => {
            const currDate = `${date.y_m}-01`;
            const year = new Date(`${currDate}T00:00:00`).toLocaleDateString('pt-BR', { year: 'numeric' });
            availableTables[year] = [];
         });

         result.forEach(date => {
            const currDate = `${date.y_m}-01`;
            const monthName = new Date(`${currDate}T00:00:00`).toLocaleDateString('pt-BR', { month: 'long' });
            const year = new Date(`${currDate}T00:00:00`).toLocaleDateString('pt-BR', { year: 'numeric' });
            availableTables[year].push(monthName);
         });
      }

      return availableTables;
   } catch (error) {
      console.error('Erro ao buscar tabelas disponíveis:', error);
      return null;
   }
}
