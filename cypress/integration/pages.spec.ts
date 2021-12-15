describe('Pages', () => {
	it('404 on bad domain', () => {
		cy.request({url: '/lorem-ipsum', failOnStatusCode: false}).its('status').should('eq', 404);

		cy.visit('/lorem-ipsum', {failOnStatusCode: false});
		cy.get('#center > h2').should('have.text', '404: Page Not Found');
	})

	it('404 on `./404`', () => {
		cy.request({url: '404', failOnStatusCode: false}).its('status').should('eq', 404);

		cy.visit('/404', {failOnStatusCode: false});
		cy.get('#center > h2').should('have.text', '404: Page Not Found');
	})

	it('homepage on `./` and `./homepage`', () => {
		cy.visit('/');
		cy.get('#welcome > h2').should('have.text', 'You Should Know Kyle!');
		cy.get('link[rel="canonical"]').invoke('attr', 'href').should('eq', 'https://yskkyle/homepage');
		
		cy.visit('/homepage');
		cy.get('#welcome > h2').should('have.text', 'You Should Know Kyle!');
	})


	it('`./[slug]`', () => {
		cy.visit('/sorting-algorithm-visualizer');
		cy.get('#about > h2').should('have.text', 'About Sorting Visualizer');
	})
})

export {};