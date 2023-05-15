describe('Pages', () => {
	it('404 on bad domain', () => {
		cy.request({url: '/e2e-bad-domain', failOnStatusCode: false}).its('status').should('eq', 404);
	});

	it('404 on `./404`', () => {
		cy.request({url: '404', failOnStatusCode: false}).its('status').should('eq', 404);
	});
});

export {};