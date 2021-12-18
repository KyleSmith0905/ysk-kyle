describe('Pages', () => {
	it('404 on bad domain', () => {
		cy.request({url: '/lorem-ipsum', failOnStatusCode: false}).its('status').should('eq', 404);

		cy.visit('/lorem-ipsum', {failOnStatusCode: false});
		cy.get('#center > h2').should('have.text', 'An Error Occurred!');
	});

	it('404 on `./404`', () => {
		cy.request({url: '404', failOnStatusCode: false}).its('status').should('eq', 404);

		cy.visit('/404', {failOnStatusCode: false});
		cy.get('#center > h2').should('have.text', 'An Error Occurred!');
	});

	it('`./[slug]`', () => {
		cy.visit('/sorting-algorithm-visualizer');
		cy.get('#about > h2').should('have.text', 'About Sorting Visualizer');
	});
});

export {};