describe('Settings', () => {
	it('Open and close settings', () => {
		cy.visit('/e2e');

		// Close intro modal
		cy.get('*[data-e2e="intro-visual-mode"]').click();
		
		cy.get('*[data-e2e="settings-list"]').invoke('attr', 'class').should('not.include', 'Hidden');
		cy.get('*[data-e2e="display-settings"]').click();
		cy.get('*[data-e2e="settings-list"]').invoke('attr', 'class').should('include', 'Hidden');
		cy.get('*[data-e2e="display-settings"]').click();
		cy.get('*[data-e2e="settings-list"]').invoke('attr', 'class').should('not.include', 'Hidden');
	});

	it('Back to home', () => {
		cy.visit('/e2e');

		// Close intro modal
		cy.get('*[data-e2e="intro-visual-mode"]').click();
	
		cy.get('*[data-e2e="home-button"]').click();

    cy.location('pathname').should('eq', '/');
	});
});

export {};