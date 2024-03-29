const movementMethods = ['Prototype', 'Browser', 'Edge Scrolling', 'Control Stick', 'Panorama'];

const selectMovementMethod = (methodName: string) => {
	// Close intro modal
	cy.get('*[data-e2e="intro-visual-mode"]').click();

	const movementIndex = movementMethods.findIndex(e => e === methodName);

	for (let i = 0; i < movementIndex; i++) {
		cy.get('*[data-e2e="travel-mode"]').click();
	}
};

describe('Movement', () => {
	it('Edge Scrolling', () => {
		cy.viewport(1000, 600);
		cy.visit('/e2e');

		selectMovementMethod('Edge Scrolling');

		cy.scrollTo(500, 700);
		cy.document().trigger('mousemove', { clientX: 500, clientY: 300});
		cy.wait(200);
		cy.window().its('scrollX').should('eq', 500);
		cy.window().its('scrollY').should('eq', 700);
		
		cy.document().trigger('mouseenter');
		cy.document().trigger('mousemove', { clientX: 0, clientY: 0 });
		cy.wait(200);
		cy.window().its('scrollX').should('be.below', 500);
		cy.window().its('scrollY').should('be.below', 700);
	});

	it('Control Stick', () => {
		cy.viewport(1000, 600);
		cy.visit('/');

		selectMovementMethod('Control Stick');

		cy.window().its('scrollX').should('eq', 500);
		cy.window().its('scrollY').should('eq', 700);
		
		cy.get('#ControlStickHandle').trigger('mousedown');
		cy.get('#ControlStickHandle').trigger('mousemove', { clientX: 500, clientY: 300});
		cy.wait(200);
		cy.window().its('scrollX').should('eq', 500);
		cy.window().its('scrollY').should('be.below', 700);
	});

	it('Panorama', () => {
		cy.visit('/');

		selectMovementMethod('Panorama');

		cy.get('#Underlay').should('have.attr', 'style').should('contain', 'transform: scale(0.33)');
		cy.get('#MainContent').should('have.attr', 'style').should('contain', 'transform: scale(0.33)');
	});
});

export {};