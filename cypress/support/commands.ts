//custom command to clean up the database
Cypress.Commands.add('cleanupDatabase', () => {

    const supabaseUrl = Cypress.env('TEST_DB_URL');
    const supabaseKey = Cypress.env('SERVICE_KEY');
    const fullURL = `${supabaseUrl}/rest/v1/tickets`;
    cy.request({
      method: 'DELETE',
      url: fullURL,
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal' 
      },
      qs: {
        select: '*',
        id: 'gt.0' // This adds the WHERE clause to delete all records where id > 0
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });