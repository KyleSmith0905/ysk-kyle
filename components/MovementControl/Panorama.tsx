import { FunctionComponent, useEffect } from 'react';

const PanoramaMovement: FunctionComponent = () => {

  useEffect(() => {
		const widthScale = window.innerWidth / 2000;
		const heightScale = window.innerHeight / 2000;
    scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
		document.body.style.transform = 'scale(' + Math.min(widthScale, heightScale) + ')';

		return () => {
			document.body.style.transform = 'none'
		};
  }, []);

	return (
		<></>
	)
}

export default PanoramaMovement;