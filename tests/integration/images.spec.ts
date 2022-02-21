describe('Images', () => {
	it('Load image bubble', () => {
		cy.visit('/devs-us');
		
		cy.get('#Bubbleimage.ImageBubble img[alt="Devs Us logo"]').should('be.visible');
	});

	it('Load background image in bubble', () => {
		cy.visit('/devs-us');
		
		cy.get('#BubblecursedAmongUs .BackgroundImageContainer img.BackgroundImage[alt=""]').should('be.visible');
	});

	it ('Image bubble is correct size', () => {
		cy.visit('/devs-us');

		cy.get('#Bubbleimage.ImageBubble img[alt="Devs Us logo"]').invoke('outerWidth').should('eq', 200);
		cy.get('#Bubbleimage.ImageBubble').invoke('outerHeight').should('eq', 200);
	});
});

export {};