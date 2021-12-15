describe('Images', () => {
	it('Load image bubble', () => {
		cy.visit('/sorting-algorithm-visualizer');
		
		cy.get('#image.ImageBubble img[alt="Sorting Algorithm Visualizer Webpage"]').should('be.visible');
	});

	it('Load background image in bubble', () => {
		cy.visit('/');
		
		cy.get('#sortingAlgorithm .BackgroundImageContainer img.BackgroundImage[alt="Sorting Visualizer"]').should('be.visible');
	});

	it ('Image bubble is correct size', () => {
		cy.visit('/sorting-algorithm-visualizer');

		cy.get('#image.ImageBubble img[alt="Sorting Algorithm Visualizer Webpage"]').invoke('outerWidth').should('eq', 200);
		cy.get('#image.ImageBubble').invoke('outerHeight').should('eq', 200);
	});
});

export {};