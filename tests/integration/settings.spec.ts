describe('Settings', () => {
	it('Open and close settings', () => {
		cy.visit('/');
		
		cy.get('#SettingsList').invoke('attr', 'class').should('not.include', 'Hidden');
		cy.get('#DisplaySettings').click();
		cy.get('#SettingsList').invoke('attr', 'class').should('include', 'Hidden');
		cy.get('#DisplaySettings').click();
		cy.get('#SettingsList').invoke('attr', 'class').should('not.include', 'Hidden');
	});

	it('Back to home', () => {
		cy.visit('/sorting-algorithm-visualizer');
	
		cy.get('#SettingsList > a[href="/"]').click();

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it('Change movement settings', () => {
		cy.visit('/');
	
		cy.get('#SettingsList > button:contains(Travel Mode)').click().should('have.text', 'Travel Mode: Edge Scrolling');
	});
});

export {};