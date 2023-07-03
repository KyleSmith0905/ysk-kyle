describe('Redirects', () => {
  it('Local `a` tags redirects', () => {
    cy.visit('/e2e');

    // Close intro modal
    cy.get('*[data-e2e="intro-visual-mode"]').click();

    cy.get('#Bubble_e2e_internalLink').click();

    cy.location('pathname').should('eq', '/');
  });
  
  it('Local `a` tags have correct attributes', () => {
    cy.visit('/e2e');

    cy.get('#Bubble_e2e_internalLink').invoke('attr', 'target').should('include', '_self');
    cy.get('#Bubble_e2e_internalLink').invoke('attr', 'rel').should('be.empty');
  });

  it('External `a` tags redirects', () => {
    cy.visit('/e2e');

    // Close intro modal
    cy.get('*[data-e2e="intro-visual-mode"]').click();
    
    cy.get('#Bubble_e2e_externalLink').invoke('removeAttr', 'target').click();

    cy.url().should('eq', 'https://blog.yskkyle.com/');
  });

  it('External `a` tags have correct attributes', () => {
    cy.visit('/e2e');

    cy.get('#Bubble_e2e_externalLink').invoke('attr', 'target').should('include', '_blank');
    cy.get('#Bubble_e2e_externalLink').invoke('attr', 'rel').should('include', 'nofollow');
    cy.get('#Bubble_e2e_externalLink').invoke('attr', 'rel').should('include', 'noopener');
  });
});

export {};