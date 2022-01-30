import { FunctionComponent, useEffect } from 'react';

const PanoramaMovement: FunctionComponent = () => {

  useEffect(() => {
		const connections = document.getElementById('Underlay');
		const content = document.getElementById('MainContent');
		if (connections === null || content === null) return;
		
		const setScale = () => {
			const widthScale = window.innerWidth / 2000;
			const heightScale = window.innerHeight / 2000;
			scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
			connections.style.transform = 'scale(' + Math.min(widthScale, heightScale) + ')';
			content.style.transform = 'scale(' + Math.min(widthScale, heightScale) + ')';
		};
		setScale();
		
		window.addEventListener('resize', setScale);
		
		return () => {
			window.removeEventListener('resize', setScale);
			connections.style.transform = 'none';
			content.style.transform = 'none';
		};
  }, []);

	return (
		<></>
	);
};

export default PanoramaMovement;