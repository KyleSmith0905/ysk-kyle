describe('Redirects', () => {
  it('Local `a` tags redirects', () => {
    cy.visit('/devs-us');
    cy.get('#cursedAmongUs').click();

    cy.url().should('include', '/cursed-among-us');
    cy.get('#about > h2').contains('About Cursed Among Us');
  });
  
  it('Local `a` tags have correct attributes', () => {
    cy.visit('/devs-us');

    cy.get('#cursedAmongUs').invoke('attr', 'target').should('include', '_self');
    cy.get('#cursedAmongUs').invoke('attr', 'rel').should('be.empty');
  });

  it('External `a` tags redirects', () => {
    cy.visit('/sorting-algorithm-visualizer');

    cy.get('#image').invoke('removeAttr', 'target').click();

    cy.url().should('eq', 'https://sorting-algorithm-jet.vercel.app/');
  });

  it('External a tags have correct attributes', () => {
    cy.visit('/sorting-algorithm-visualizer');

    cy.get('#image').invoke('attr', 'target').should('include', '_blank');
    cy.get('#image').invoke('attr', 'rel').should('include', 'nofollow');
    cy.get('#image').invoke('attr', 'rel').should('include', 'noopener');
  });
});

export {};