describe('Images', () => {
	it('Load image bubble', () => {
		cy.visit('/e2e');
		
		cy.get('#Bubble_e2e_image img[alt="Example image"]').should('be.visible');
	});

	it('Load background image in bubble', () => {
		cy.visit('/e2e');
		
		cy.get('#Bubble_e2e_backgroundImage img').should('be.visible');
	});

	it ('Image bubble is correct size', () => {
		cy.visit('/e2e');

		cy.get('#Bubble_e2e_image img[alt="Example image"]').invoke('outerWidth').should('eq', 200);
		cy.get('#Bubble_e2e_image').invoke('outerHeight').should('eq', 200);
	});
});

export {};